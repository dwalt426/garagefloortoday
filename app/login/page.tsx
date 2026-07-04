import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign In", robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <div className="min-h-screen grid place-items-center" style={{ backgroundColor: "#F6F1E7" }}>
      <div className="w-full max-w-sm px-6">
        <div className="flex items-baseline gap-1 mb-8 justify-center">
          <span className="text-2xl font-extrabold font-display text-gft-black">GFT</span>
          <span className="text-sm font-semibold text-gft-gray500 font-body">Sign in</span>
        </div>
        <LoginForm next={next ?? "/admin/leads"} />
      </div>
    </div>
  );
}
