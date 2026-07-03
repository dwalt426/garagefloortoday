import { createClient } from "../supabase-server";

export type Role = "customer" | "installer" | "admin";

export interface SessionUser {
  id: string;
  email: string | undefined;
  role: Role;
  franchiseeId?: string; // admins scoped to their franchise territory
}

/** Server-side session resolver used by every protected page.
 *  Middleware already gates the route prefix; this gives the page the typed
 *  user + role for in-page authorization (e.g. franchise-scoped data).
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    role: (user.app_metadata?.role as Role) ?? "customer",
    franchiseeId: user.app_metadata?.franchisee_id as string | undefined,
  };
}

/** Assert a role in a page/action; throws (caught by error boundary) if not. */
export async function requireRole(role: Role): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  if (user.role !== role && !(role === "customer" && user.role === "admin")) {
    throw new Error("FORBIDDEN");
  }
  return user;
}
