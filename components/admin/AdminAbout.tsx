"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  FolderKanban,
} from "lucide-react";
import AdminFrame, { Panel, useAdminContent } from "./AdminFrame";

const pages = [
  {
    id: "about-company",
    href: "/admin/about/company",
    icon: Building2,
    fallback: "Компанийн тухай",
  },
  {
    id: "about-projects",
    href: "/admin/about/projects",
    icon: FolderKanban,
    fallback: "Оролцсон төсөл",
  },
  {
    id: "about-careers",
    href: "/admin/about/careers",
    icon: BriefcaseBusiness,
    fallback: "Ажлын байр",
  },
];

export default function AdminAbout() {
  const [content] = useAdminContent();
  return (
    <AdminFrame section="about" title="Танилцуулга">
      <Panel
        title="Танилцуулгын хуудсууд"
        description="Засах хуудсаа сонгоно уу."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {pages.map(({ id, href, icon: Icon, fallback }) => {
            const page = content.aboutPages.find((item) => item.id === id);
            return (
              <a
                key={id}
                href={href}
                className="rounded-lg border border-[#e4e8e3] p-5 hover:border-[#f47a35] hover:bg-[#fffaf6]"
              >
                <Icon size={20} className="text-[#e77735]" />
                <h2 className="mt-4 text-[14px] font-bold">
                  {page?.title ?? fallback}
                </h2>
                <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-[#89938a]">
                  {page?.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-[#e77735]">
                  Засах <ArrowRight size={13} />
                </span>
              </a>
            );
          })}
        </div>
      </Panel>
    </AdminFrame>
  );
}
