"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  FolderKanban,
} from "lucide-react";
import {
  defaultSiteContent,
  loadSiteContent,
  type SiteContent,
} from "@/lib/site-content";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import RichTextContent from "./RichTextContent";

type AboutTab = "company" | "projects" | "careers";

const tabs: { id: AboutTab; label: string; icon: typeof Building2 }[] = [
  { id: "company", label: "Компанийн тухай", icon: Building2 },
  { id: "projects", label: "Оролцсон төсөл", icon: FolderKanban },
  { id: "careers", label: "Ажлын байр", icon: BriefcaseBusiness },
];

function tabFromHash(): AboutTab {
  const hash = window.location.hash.slice(1);
  return tabs.some((tab) => tab.id === hash) ? (hash as AboutTab) : "company";
}

export default function AboutSite() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeTab, setActiveTab] = useState<AboutTab>("company");

  useEffect(() => {
    let mounted = true;
    const syncTab = () => setActiveTab(tabFromHash());
    syncTab();
    window.addEventListener("hashchange", syncTab);
    window.addEventListener("popstate", syncTab);
    loadSiteContent()
      .then((saved) => {
        if (mounted) setContent(saved);
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
      window.removeEventListener("hashchange", syncTab);
      window.removeEventListener("popstate", syncTab);
    };
  }, []);

  const company = content.aboutPages.find(
    (page) => page.id === "about-company",
  );
  const companySections = company?.sections?.length
    ? company.sections
    : company
      ? [
          {
            id: "about-company-main",
            title: company.title,
            description: company.description,
            image: company.image ?? "",
          },
        ]
      : [];
  const projects = content.aboutPages.find(
    (page) => page.id === "about-projects",
  );
  const careers = content.aboutPages.find(
    (page) => page.id === "about-careers",
  );

  function selectTab(tab: AboutTab) {
    window.history.pushState({}, "", `/about#${tab}`);
    setActiveTab(tab);
  }

  return (
    <main className="min-h-screen bg-white text-[#0c1720]">
      <SiteHeader content={content} />

      <section className="border-b border-[#e6e9e5] bg-[#f5f6f4]">
        <div className="container pt-10 sm:pt-14">
          <div className="eyebrow">ТАНИЛЦУУЛГА</div>
          <h1 className="mt-3 max-w-[760px] text-[32px] font-black leading-tight sm:text-[40px]">
            {content.brand.name} компанийн тухай
          </h1>
          <p className="mt-3 max-w-[650px] text-[14px] leading-6 text-slate-600">
            Манай компани, хэрэгжүүлсэн төслүүд болон нээлттэй ажлын байрны
            мэдээлэл.
          </p>

          <div
            role="tablist"
            aria-label="Танилцуулгын хэсгүүд"
            className="mt-8 flex gap-2 overflow-x-auto border-b border-[#dce1db]"
          >
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={activeTab === id}
                aria-controls={`panel-${id}`}
                onClick={() => selectTab(id)}
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-[12px] font-bold transition-colors ${
                  activeTab === id
                    ? "border-[#f36b21] text-[#d95610]"
                    : "border-transparent text-slate-500 hover:text-[#17212a]"
                }`}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container min-h-[440px] py-10 sm:py-14">
        {activeTab === "company" && (
          <div role="tabpanel" id="panel-company" aria-labelledby="tab-company">
            {companySections.map((section, index) => (
              <article
                key={section.id}
                className={
                  index > 0 ? "mt-10 border-t border-[#e6e9e5] pt-8" : ""
                }
              >
                <h2 className="text-[25px] font-black leading-tight">
                  {section.title || `Компанийн тухай ${index + 1}`}
                </h2>
                <div
                  className={`mt-5 grid items-start gap-5 md:gap-7 ${
                    section.image ? "md:grid-cols-[0.9fr_1.1fr]" : ""
                  }`}
                >
                  {section.image && (
                    <img
                      src={section.image}
                      alt={section.title || "Компанийн тухай"}
                      className="aspect-[1.35] w-full rounded-md object-cover"
                    />
                  )}
                  {section.description && (
                    <RichTextContent
                      content={section.description}
                      className="text-[14px] leading-7 text-slate-600"
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === "projects" && (
          <div
            role="tabpanel"
            id="panel-projects"
            aria-labelledby="tab-projects"
          >
            <div className="max-w-full">
              <div className="eyebrow">ТУРШЛАГА</div>
              <h2 className="mt-3 text-[26px] font-black">
                {projects?.title ?? "Оролцсон төсөл"}
              </h2>
              <RichTextContent
                content={projects?.description ?? ""}
                className="mt-3 text-[14px] leading-6 text-slate-600"
              />
            </div>
            {(projects?.projects ?? []).length > 0 ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {(projects?.projects ?? []).map((project, index) => (
                  <article
                    key={project.id}
                    tabIndex={0}
                    aria-label={project.title}
                    className="group relative aspect-[.82] overflow-hidden rounded-sm bg-[#17212a] outline-none focus-visible:ring-2 focus-visible:ring-[#f36b21]"
                  >
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07131c]/90 via-[#07131c]/15 to-transparent transition-opacity duration-300 group-hover:opacity-70 group-focus:opacity-70" />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#ff9a61]">
                        ТӨСӨЛ {String(index + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-1 text-[16px] font-bold leading-snug transition-transform duration-300 group-hover:-translate-y-1 group-focus:-translate-y-1">
                        {project.title}
                      </h3>
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr]">
                        <div className="min-h-0 overflow-hidden">
                          <RichTextContent
                            content={project.description}
                            className="mt-3 translate-y-2 rounded-sm bg-[#111c24]/5 p-1 text-[12px] leading-5 text-white/85 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-8 border-y border-[#dfe4df] py-6 text-[13px] text-slate-500">
                Төслийн мэдээлэл удахгүй нэмэгдэнэ.
              </p>
            )}
          </div>
        )}

        {activeTab === "careers" && (
          <div role="tabpanel" id="panel-careers" aria-labelledby="tab-careers">
            <div className="max-w-[720px]">
              <div className="eyebrow">НЭЭЛТТЭЙ БОЛОМЖ</div>
              <h2 className="mt-3 text-[26px] font-black">
                {careers?.title ?? "Ажлын байр"}
              </h2>
              <RichTextContent
                content={careers?.description ?? ""}
                className="mt-3 text-[14px] leading-6 text-slate-600"
              />
            </div>
            {(careers?.careers ?? []).length > 0 ? (
              <div className="mt-8 divide-y divide-[#dfe4df] border-y border-[#dfe4df]">
                {(careers?.careers ?? []).map((opening) => (
                  <details key={opening.id} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f36b21]">
                      <span className="text-[16px] font-bold text-[#17212a]">
                        {opening.title}
                      </span>
                      <ChevronDown
                        size={18}
                        className="shrink-0 text-[#d95610] transition-transform duration-200 group-open:rotate-180"
                      />
                    </summary>
                    <div className="grid gap-4 pb-6 md:grid-cols-[1fr_auto]">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-wide text-[#d95610]">
                            Гүйцэтгэх ерөнхий үүрэг
                          </h4>
                          <RichTextContent
                            content={
                              opening.duties ?? opening.description ?? ""
                            }
                            className="mt-2 text-[13px] leading-6 text-slate-600"
                          />
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-wide text-[#d95610]">
                            Ажлын байранд тавигдах шаардлага
                          </h4>
                          <RichTextContent
                            content={opening.requirements ?? ""}
                            className="mt-2 text-[13px] leading-6 text-slate-600"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap content-start gap-2 text-[11px] font-semibold text-slate-600 md:flex-col md:items-end">
                        <span className="rounded-sm bg-[#f5f6f4] px-2.5 py-1.5">
                          {opening.headcount ?? 1} хүн авна
                        </span>
                        {opening.applicationDeadline && (
                          <span className="rounded-sm bg-[#f5f6f4] px-2.5 py-1.5">
                            Анкет авах хугацаа:{" "}
                            {opening.applicationDeadline
                              .split("-")
                              .reverse()
                              .join(".")}
                          </span>
                        )}
                        <div className="rounded-sm bg-[#f5f6f4] px-2.5 py-1.5">
                          info@elsys.mn хаягруу илгээнэ үү
                        </div>
                        <a
                          href="/anket.pdf"
                          download="anket.pdf"
                          className="rounded-sm bg-[#d95610] px-2.5 py-1.5 text-white hover:bg-[#a93d08]"
                        >
                          Анкет татах
                        </a>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <p className="mt-8 border-y border-[#dfe4df] py-6 text-[13px] text-slate-500">
                Одоогоор нээлттэй ажлын байр байхгүй.
              </p>
            )}
          </div>
        )}

        <a
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-[12px] font-bold text-[#d95610] hover:text-[#a93d08]"
        >
          Нүүр хуудас руу буцах <ArrowRight size={14} />
        </a>
      </section>
      <SiteFooter content={content} />
    </main>
  );
}
