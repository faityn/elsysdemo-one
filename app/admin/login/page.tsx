"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LockKeyhole, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getSupabaseBrowserClient()
      .auth.getSession()
      .then(({ data }) => {
        if (data.session?.user.app_metadata?.role === "admin") {
          router.replace("/admin");
        }
      })
      .catch(() => undefined);
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const trimmedIdentifier = identifier.trim();
    const configuredUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME?.trim();
    const configuredEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim();
    const email = trimmedIdentifier.includes("@")
      ? trimmedIdentifier
      : configuredUsername &&
          configuredEmail &&
          trimmedIdentifier.toLocaleLowerCase() ===
            configuredUsername.toLocaleLowerCase()
        ? configuredEmail
        : "";

    if (!email) {
      setError("Имэйл эсвэл тохируулсан хэрэглэгчийн нэрээ оруулна уу.");
      setSubmitting(false);
      return;
    }

    try {
      const { data, error: signInError } =
        await getSupabaseBrowserClient().auth.signInWithPassword({
          email,
          password,
        });
      if (signInError || !data.user) {
        setError("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
        return;
      }
      if (data.user.app_metadata?.role !== "admin") {
        await getSupabaseBrowserClient().auth.signOut();
        setError("Энэ бүртгэлд админ эрх олгогдоогүй байна.");
        return;
      }
      router.replace("/admin");
    } catch {
      setError("Нэвтрэх үед алдаа гарлаа. Supabase тохиргоогоо шалгана уу.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f6f3] lg:grid lg:grid-cols-2">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#14231d] text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <img
          src="/images/hero.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#102019]/95 via-[#102019]/70 to-[#102019]/35" />
        <a href="/" className="relative text-[25px] font-black text-[#ff873f]">
          elsys<span className="text-[13px] text-white">.eng.</span>
        </a>
        <div className="relative max-w-[460px] pb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffad79]">
            ELSYS ENG. / УДИРДЛАГА
          </p>
          <h1 className="mt-4 text-[38px] font-black leading-tight">
            Сайтын удирдлагын хэсэг
          </h1>
          <p className="mt-4 max-w-[380px] text-[13px] leading-6 text-white/70">
            Нэвтэрч бүтээгдэхүүн болон сайтын мэдээллээ удирдана уу.
          </p>
        </div>
        <span className="relative text-[9px] font-semibold tracking-[0.12em] text-white/45">
          BUILDING A SAFER FUTURE
        </span>
      </section>

      <section className="grid min-h-screen place-items-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-[390px]">
          <a
            href="/"
            className="text-[22px] font-black text-[#ed762f] lg:hidden"
          >
            elsys<span className="text-[11px] text-[#17212a]">.eng.</span>
          </a>
          <div className="mt-8 lg:mt-0">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-[#fff0e8] text-[#e76b35]">
              <LockKeyhole size={19} />
            </div>
            <h2 className="mt-5 text-[25px] font-black text-[#17212a]">
              Админд нэвтрэх
            </h2>
            <p className="mt-2 text-[12px] leading-5 text-[#77837c]">
              Хэрэглэгчийн нэр эсвэл имэйл, нууц үгээ оруулна уу.
            </p>
          </div>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold text-[#435047]">
                Хэрэглэгчийн нэр эсвэл имэйл
              </span>
              <input
                autoComplete="username"
                autoFocus
                required
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="Нэвтрэх нэр эсвэл имэйл"
                className="h-11 w-full border border-[#dfe4df] bg-white px-3 text-[13px] text-[#202a24] outline-none transition-colors placeholder:text-[#a0aaa4] focus:border-[#ed762f]"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold text-[#435047]">
                Нууц үг
              </span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Нууц үг"
                className="h-11 w-full border border-[#dfe4df] bg-white px-3 text-[13px] text-[#202a24] outline-none transition-colors placeholder:text-[#a0aaa4] focus:border-[#ed762f]"
              />
            </label>
            {error && (
              <p
                role="alert"
                className="border border-red-200 bg-red-50 px-3 py-2.5 text-[11px] leading-5 text-red-700"
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-11 w-full items-center justify-center gap-2 bg-[#ed762f] text-[12px] font-bold text-white transition-colors hover:bg-[#d96524] disabled:cursor-wait disabled:opacity-60"
            >
              <LogIn size={15} />
              {submitting ? "Нэвтэрч байна..." : "Нэвтрэх"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
