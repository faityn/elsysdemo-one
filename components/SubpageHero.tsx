import type { ReactNode } from "react";

export default function SubpageHero({
  eyebrow,
  title,
  description,
  image,
  aside,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative h-[270px] max-h-[300px] overflow-hidden bg-[#07131c] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image || "/images/hero.png"}')` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#07131c]/95 via-[#07131c]/72 to-[#07131c]/38"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#07131c]/55 via-transparent to-[#07131c]/10"
      />
      <div className="container relative flex h-full flex-col justify-end pb-0 pt-7">
        <div
          className={`flex items-end justify-between gap-5 ${
            children ? "border-b border-white/20 pb-4" : "pb-7"
          }`}
        >
          <div className="min-w-0 max-w-[760px]">
            <div className="eyebrow">{eyebrow}</div>
            <h1 className="mt-2 text-[27px] font-black leading-tight sm:text-[34px]">
              {title}
            </h1>
            {description && (
              <p className="mt-2 max-w-[650px] text-[12px] leading-5 text-white/75 sm:text-[13px]">
                {description}
              </p>
            )}
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  );
}
