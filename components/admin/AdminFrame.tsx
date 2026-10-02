"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Boxes,
  FileImage,
  LayoutDashboard,
  Menu as MenuIcon,
  Package,
  Phone,
  Save,
  ShieldCheck,
  Tags,
  Upload,
  Users,
} from "lucide-react";
import {
  defaultSiteContent,
  loadSiteContent,
  saveSiteContent,
  type SiteContent,
} from "@/lib/site-content";

export type AdminSection =
  | "overview"
  | "home"
  | "menu"
  | "products"
  | "categories"
  | "uploads"
  | "about"
  | "contact";

const navigation: {
  id: AdminSection;
  label: string;
  icon: typeof LayoutDashboard;
  href: string;
}[] = [
  {
    id: "overview",
    label: "Хянах самбар",
    icon: LayoutDashboard,
    href: "/admin",
  },
  { id: "home", label: "Нүүр хуудас", icon: FileImage, href: "/admin/home" },
  { id: "menu", label: "Цэс удирдах", icon: MenuIcon, href: "/admin/menu" },
  {
    id: "products",
    label: "Бүтээгдэхүүн",
    icon: Package,
    href: "/admin/products",
  },
  { id: "categories", label: "Ангилал", icon: Tags, href: "/admin/categories" },
  {
    id: "uploads",
    label: "Зураг / Uploads",
    icon: Upload,
    href: "/admin/uploads",
  },
  {
    id: "about",
    label: "Танилцуулга",
    icon: ShieldCheck,
    href: "/admin/about",
  },
  { id: "contact", label: "Холбоо барих", icon: Phone, href: "/admin/contact" },
];

export function useAdminContent(autoSave = true) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loaded, setLoaded] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let active = true;
    loadSiteContent().then((saved) => {
      if (!active) return;
      setContent(saved);
      setLoaded(true);
      setDirty(false);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!autoSave || !loaded || !dirty) return;
    const timer = window.setTimeout(() => {
      saveSiteContent(content).catch(() => undefined);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [autoSave, content, loaded, dirty]);

  const updateContent: Dispatch<SetStateAction<SiteContent>> = (value) => {
    setDirty(true);
    setContent(value);
  };

  return [content, updateContent] as const;
}

export function Panel({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-[#e4e8e3] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf0ec] px-5 py-4">
        <div>
          <h2 className="text-[14px] font-bold text-[#202b24]">{title}</h2>
          {description && (
            <p className="mt-1 text-[11px] text-[#89938a]">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold text-[#414942]">
        {label}
      </span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-[#dfe4df] bg-white px-3 py-2.5 text-[13px] text-[#202a24] outline-none focus:border-[#eb762f] focus:ring-2 focus:ring-[#eb762f]/10"
      />
    </label>
  );
}

export default function AdminFrame({
  section,
  title,
  children,
  onSave,
}: {
  section: AdminSection;
  title: string;
  children: ReactNode;
  onSave?: () => void | Promise<void>;
}) {
  const active = navigation.find((item) => item.id === section);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    const handleSaved = () => {
      setSavedMessage(true);
      window.setTimeout(() => setSavedMessage(false), 2400);
    };
    window.addEventListener("admin-content-saved", handleSaved);
    return () => window.removeEventListener("admin-content-saved", handleSaved);
  }, []);
  async function publish() {
    if (onSave) {
      await onSave();
      return;
    }
    const content = await loadSiteContent();
    await saveSiteContent(content);
  }
  return (
    <div className="min-h-screen bg-[#f3f5f1] text-[#202a24] lg:flex">
      <aside className="flex w-full shrink-0 flex-col bg-[#17251f] text-white lg:sticky lg:top-0 lg:h-screen lg:w-[238px]">
        <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
          <a
            href="/"
            className="text-[21px] font-black tracking-[-1px] text-[#ff873f]"
          >
            elsys<span className="text-[11px] text-white">.eng.</span>
          </a>
          <span className="rounded bg-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#c7d0c8]">
            Admin
          </span>
        </div>
        <div className="px-4 pb-2 pt-5 text-[9px] font-bold uppercase tracking-[.16em] text-[#7f9085]">
          Удирдлага
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-1 lg:overflow-visible">
          {navigation.map(({ id, label, icon: Icon, href }) => (
            <a
              key={id}
              href={href}
              className={`flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-left text-[12px] font-semibold transition lg:w-full ${section === id ? "bg-[#f47a35] text-white" : "text-[#b6c2b9] hover:bg-white/10 hover:text-white"}`}
            >
              <Icon size={16} strokeWidth={1.8} />
              {label}
            </a>
          ))}
        </nav>
        <div className="mt-auto hidden border-t border-white/10 p-4 lg:block">
          <a
            href="/"
            className="flex items-center gap-2 text-[11px] text-[#bac6bd] hover:text-white"
          >
            <ArrowLeft size={14} /> Сайт руу буцах
          </a>
        </div>
      </aside>
      <main className="min-w-0 flex-1">
        <header className="flex min-h-[72px] items-center justify-between border-b border-[#e5e9e3] bg-white px-5 sm:px-8">
          <div>
            <div className="text-[10px] text-[#89938a]">
              Удирдлага <span className="mx-1">/</span> {active?.label}
            </div>
            <h1 className="mt-1 text-[16px] font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            {savedMessage && (
              <span
                role="status"
                className="hidden items-center gap-1.5 rounded border border-green-200 bg-green-50 px-2.5 py-2 text-[10px] font-semibold text-green-800 sm:flex"
              >
                Хадгалагдлаа
              </span>
            )}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded border border-[#dfe4df] px-3 py-2 text-[11px] font-semibold text-[#49544c] hover:bg-[#f6f7f4] sm:inline-flex"
            >
              <ArrowUpRight size={14} /> Сайт үзэх
            </a>
            <button
              type="button"
              onClick={publish}
              className="inline-flex items-center gap-2 rounded bg-[#ed762f] px-3.5 py-2.5 text-[11px] font-bold text-white hover:bg-[#dc6421]"
            >
              <Save size={14} /> Хадгалах
            </button>
          </div>
        </header>
        <div className="mx-auto max-w-[1120px] space-y-5 px-4 py-6 sm:px-8 sm:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
