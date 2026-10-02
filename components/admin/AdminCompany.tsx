"use client";

import { Plus, Trash2 } from "lucide-react";
import { useAdminContent, Field, Panel } from "./AdminFrame";
import AdminFrame from "./AdminFrame";
import AdminImageField from "./AdminImageField";
import RichTextEditor from "./RichTextEditor";
import type { AboutCompanySection } from "@/lib/site-content";

type CompanyPage = {
  id: string;
  title: string;
  description: string;
  image?: string;
  sections?: AboutCompanySection[];
};

function sectionsForPage(page: CompanyPage): AboutCompanySection[] {
  return page.sections?.length
    ? page.sections
    : [
        {
          id: `${page.id}-main`,
          title: page.title,
          description: page.description,
          image: page.image ?? "",
        },
      ];
}

export default function AdminCompany() {
  const [content, setContent] = useAdminContent();
  const page = content.aboutPages.find((item) => item.id === "about-company");
  const sections = page ? sectionsForPage(page) : [];

  function updateEnabled(value: boolean) {
    setContent((current) => ({
      ...current,
      aboutPages: current.aboutPages.map((item) =>
        item.id === "about-company" ? { ...item, enabled: value } : item,
      ),
    }));
  }

  function updateSection(
    sectionId: string,
    field: "title" | "description" | "image",
    value: string,
  ) {
    setContent((current) => ({
      ...current,
      aboutPages: current.aboutPages.map((item) => {
        if (item.id !== "about-company") return item;
        const nextSections = sectionsForPage(item).map((section) =>
          section.id === sectionId ? { ...section, [field]: value } : section,
        );
        const firstSection = nextSections[0];
        return {
          ...item,
          sections: nextSections,
          title: firstSection.title,
          description: firstSection.description,
          image: firstSection.image,
        };
      }),
    }));
  }

  function addSection() {
    setContent((current) => ({
      ...current,
      aboutPages: current.aboutPages.map((item) =>
        item.id === "about-company"
          ? {
              ...item,
              sections: [
                ...sectionsForPage(item),
                {
                  id: `company-section-${crypto.randomUUID()}`,
                  title: "",
                  description: "",
                  image: "",
                },
              ],
            }
          : item,
      ),
    }));
  }

  function removeSection(sectionId: string) {
    setContent((current) => ({
      ...current,
      aboutPages: current.aboutPages.map((item) => {
        if (item.id !== "about-company") return item;
        const nextSections = sectionsForPage(item).filter(
          (section) => section.id !== sectionId,
        );
        if (!nextSections.length) return item;
        return {
          ...item,
          sections: nextSections,
          title: nextSections[0].title,
          description: nextSections[0].description,
          image: nextSections[0].image,
        };
      }),
    }));
  }

  return (
    <AdminFrame section="about" title="Компанийн тухай">
      <Panel
        title="Компанийн танилцуулга"
        description="Гарчиг, зураг, тайлбар бүхий мэдээллийн хэсгүүдийг дарааллаар нэмнэ."
      >
        <label className="mb-5 flex items-center gap-2 text-[12px] font-semibold text-[#414942]">
          <input
            type="checkbox"
            checked={page?.enabled ?? false}
            onChange={(event) => updateEnabled(event.target.checked)}
            className="accent-[#eb762f]"
          />
          Идэвхтэй
        </label>
        <div className="space-y-5">
          {sections.map((section, index) => (
            <section
              key={section.id}
              className="rounded-md border border-[#e4e8e3]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-[#edf0ec] px-4 py-3">
                <h3 className="text-[12px] font-bold text-[#202b24]">
                  Мэдээлэл {index + 1}
                </h3>
                {sections.length > 1 && (
                  <button
                    type="button"
                    aria-label={`Мэдээлэл ${index + 1} устгах`}
                    title="Мэдээлэл устгах"
                    onClick={() => removeSection(section.id)}
                    className="inline-flex h-8 items-center gap-1.5 rounded border border-[#e5d6d1] px-2.5 text-[11px] font-semibold text-[#9d4d39] hover:bg-[#fff7f4]"
                  >
                    <Trash2 size={13} /> Устгах
                  </button>
                )}
              </div>
              <div className="grid gap-4 p-4">
                <Field
                  label="Гарчиг"
                  value={section.title}
                  onChange={(value) =>
                    updateSection(section.id, "title", value)
                  }
                />
                <AdminImageField
                  label="Зураг"
                  value={section.image}
                  onChange={(value) =>
                    updateSection(section.id, "image", value)
                  }
                />
                <RichTextEditor
                  label="Текст"
                  value={section.description}
                  onChange={(value) =>
                    updateSection(section.id, "description", value)
                  }
                />
              </div>
            </section>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center gap-2 rounded border border-[#dfe4df] bg-white px-3 py-2.5 text-[11px] font-bold text-[#38433b] hover:bg-[#f6f7f4]"
          >
            <Plus size={14} /> Мэдээлэл нэмэх
          </button>
        </div>
      </Panel>
    </AdminFrame>
  );
}
