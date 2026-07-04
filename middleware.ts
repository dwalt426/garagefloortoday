import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

/** Protects the three portals. Public marketing/SEO pages are untouched.
 *  Role is read from a `role` claim in app_metadata (set via Supabase on signup/
 *  invite): 'customer' | 'installer' | 'admin'.
 */
const PORTALS: { prefix: string; role: string }[] = [
  { prefix: "/portal", role: "customer" },   // homeowner: FloorPassport, warranty, maintenance
  { prefix: "/crew", role: "installer" },     // installer: today's jobs, uploads, close project
  { prefix: "/admin", role: "admin" },        // admin: CRM, leads, pricing, content, analytics
];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const gate = PORTALS.find((p) => path.startsWith(p.prefix));
  if (!gate) return NextResponse.next();

  let res = NextResponse.next({ request: req });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (list) => {
          list.forEach(({ name, value }) => req.cookies.set(name, value));
          res = NextResponse.next({ request: req });
          list.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const login = new URL("/login", req.url);
    login.searchParams.set("next", path);
    return NextResponse.redirect(login);
  }

  const role = (user.app_metadata?.role as string) ?? "customer";
  if (role !== gate.role && !(gate.role === "customer" && role === "admin")) {
    // admins can view customer portal; otherwise wrong-role → their own home
    return NextResponse.redirect(new URL("/", req.url));
  }
  return res;
}

export const config = {
  matcher: ["/portal/:path*", "/crew/:path*", "/admin/:path*"],
};
