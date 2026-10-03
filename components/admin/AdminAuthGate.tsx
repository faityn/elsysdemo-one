"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function AdminAuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    let active = true;
    const supabase = getSupabaseBrowserClient();
    const requireAdmin = () => {
      if (!active) return;
      setAuthorized(false);
      setChecking(false);
      router.replace("/admin/login");
    };

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!active) return;
        const user = data.session?.user;
        if (error || user?.app_metadata?.role !== "admin") {
          requireAdmin();
          return;
        }
        setAuthorized(true);
        setChecking(false);
      })
      .catch(requireAdmin);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      if (session?.user.app_metadata?.role !== "admin") {
        requireAdmin();
      } else {
        setAuthorized(true);
        setChecking(false);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [isLoginPage, router]);

  if (isLoginPage) return children;
  if (!authorized || checking) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f6f3] text-[13px] text-[#69756c]">
        Нэвтрэх эрхийг шалгаж байна...
      </main>
    );
  }
  return children;
}
