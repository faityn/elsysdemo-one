"use client";

import { useState, type FormEvent } from "react";
import { Menu, Search } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";

function menuHref(id: string, fallback: string, label: string) {
  const normalizedLabel = label.trim().toLocaleLowerCase();
  const tabById: Record<string, string> = {
    "about-company": "company",
    "about-projects": "projects",
    "about-careers": "careers",
  };
  const tabByLabel: Record<string, string> = {
    "компанийн тухай": "company",
    "оролцсон төсөл": "projects",
    "ажлын байр": "careers",
  };
  const aboutTab = tabById[id] ?? tabByLabel[normalizedLabel];
  if (aboutTab) return `/about#${aboutTab}`;

  if (
    id === "about" ||
    ["тухай", "танилцуулга", "бидний тухай"].includes(normalizedLabel)
  ) {
    return "/about";
  }
  if (
    id === "products" ||
    ["бүтээгдэхүүн", "бүтээгдэхүүнүүд"].includes(normalizedLabel)
  ) {
    return "/products";
  }
  if (
    id === "home" ||
    ["нүүр", "нүүр хуудас", "home"].includes(normalizedLabel) ||
    fallback === "#home"
  ) {
    return "/";
  }
  if (id === "contact") return "/#contact";
  return fallback;
}

export default function SiteHeader({ content }: { content: SiteContent }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");

  function submitProductSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = productSearch.trim();
    const searchParams = new URLSearchParams();
    if (query) searchParams.set("search", query);
    const search = searchParams.toString();
    window.location.href = `/products${search ? `?${search}` : ""}`;
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 h-[72px] border-b bg-white">
      <div className="container flex h-full items-center gap-7">
        <a
          href="/"
          className="font-black text-[25px] tracking-[-1.5px] text-[#f36b21]"
        >
          {content.brand.name}
          <span className="text-[12px] text-[#17212a]">
            {content.brand.suffix}
          </span>
          <span className="mt-[-2px] block text-[7px] tracking-[.25em] text-slate-400">
            {content.brand.tagline}
          </span>
        </a>
        <nav className="hidden flex-1 items-center justify-center gap-7 text-[11px] font-bold md:flex">
          {content.menu
            .filter((item) => item.enabled)
            .map((item, index) =>
              item.children?.length ? (
                <div
                  key={item.id}
                  className="group relative flex h-full items-center"
                >
                  <a
                    href={menuHref(item.id, item.href, item.label)}
                    className={index === 0 ? "py-5 text-orange-500" : "py-5"}
                  >
                    {item.label}
                  </a>
                  <div className="invisible absolute left-0 top-full z-50 w-48 translate-y-1 rounded-b-md border border-slate-100 bg-white py-2 text-[12px] font-normal text-slate-600 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {item.children
                      .filter((child) => child.enabled)
                      .map((child) => (
                        <a
                          key={child.id}
                          href={menuHref(child.id, child.href, child.label)}
                          className="block px-4 py-2.5 hover:bg-orange-50 hover:text-orange-500"
                        >
                          {child.label}
                        </a>
                      ))}
                  </div>
                </div>
              ) : (
                <a
                  key={item.id}
                  href={menuHref(item.id, item.href, item.label)}
                  className={index === 0 ? "text-orange-500" : ""}
                >
                  {item.label}
                </a>
              ),
            )}
        </nav>
        <div className="ml-auto flex items-center gap-4 md:ml-0">
          <form
            role="search"
            onSubmit={submitProductSearch}
            className="hidden h-10 w-40 items-center gap-2 rounded-full bg-slate-50 px-3 text-[12px] text-slate-400 sm:flex"
          >
            <input
              value={productSearch}
              onChange={(event) => setProductSearch(event.target.value)}
              placeholder="Бүтээгдэхүүн хайх"
              aria-label="Бүтээгдэхүүн хайх"
              className="h-full min-w-0 flex-1 bg-transparent text-[#17212a] outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              aria-label="Хайх"
              className="grid h-7 w-7 shrink-0 place-items-center text-[#17212a] hover:text-orange-500"
            >
              <Search size={14} />
            </button>
          </form>
          <button
            type="button"
            className="text-[#17212a] md:hidden"
            aria-label="Цэс нээх"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="absolute left-0 right-0 top-full border-t border-slate-100 bg-white px-6 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-4 text-[12px] font-semibold text-slate-700">
            {content.menu
              .filter((item) => item.enabled)
              .map((item) => (
                <div key={item.id}>
                  <a
                    href={menuHref(item.id, item.href, item.label)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                  {item.children?.length ? (
                    <div className="mt-2 flex flex-col gap-2 border-l border-orange-200 pl-3 text-[11px] font-normal">
                      {item.children
                        .filter((child) => child.enabled)
                        .map((child) => (
                          <a
                            key={child.id}
                            href={menuHref(child.id, child.href, child.label)}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </a>
                        ))}
                    </div>
                  ) : null}
                </div>
              ))}
            <form
              role="search"
              onSubmit={submitProductSearch}
              className="flex h-10 items-center gap-2 rounded-full bg-slate-50 px-3 text-slate-500"
            >
              <input
                value={productSearch}
                onChange={(event) => setProductSearch(event.target.value)}
                placeholder="Хайх"
                aria-label="Хайх"
                className="h-full min-w-0 flex-1 bg-transparent text-[12px] text-[#17212a] outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                aria-label="Хайх"
                className="grid h-7 w-7 shrink-0 place-items-center text-[#17212a] hover:text-orange-500"
              >
                <Search size={15} />
              </button>
            </form>
          </div>
        </nav>
      )}
    </header>
  );
}
