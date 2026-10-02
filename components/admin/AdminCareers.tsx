"use client";

import { Plus, Trash2 } from "lucide-react";
import { useAdminContent, Field, Panel } from "./AdminFrame";
import AdminFrame from "./AdminFrame";
import RichTextEditor from "./RichTextEditor";
import type { CareerOpening, SiteContent } from "@/lib/site-content";

export default function AdminCareers() {
  const [content, setContent] = useAdminContent();
  const page = content.aboutPages.find((item) => item.id === "about-careers");

  function updatePage(updates: Partial<SiteContent["aboutPages"][number]>) {
    setContent((current) => ({
      ...current,
      aboutPages: current.aboutPages.map((item) =>
        item.id === "about-careers" ? { ...item, ...updates } : item,
      ),
    }));
  }

  function updateOpening(id: string, updates: Partial<CareerOpening>) {
    updatePage({
      careers: (page?.careers ?? []).map((opening) =>
        opening.id === id ? { ...opening, ...updates } : opening,
      ),
    });
  }

  function addOpening() {
    const opening: CareerOpening = {
      id: crypto.randomUUID(),
      title: "",
      duties: "",
      requirements: "",
      headcount: 1,
      applicationDeadline: "",
    };
    updatePage({ careers: [...(page?.careers ?? []), opening] });
  }

  return (
    <AdminFrame section="about" title="Ажлын байр">
      <Panel
        title="Ажлын байрны хуудас"
        description="Ерөнхий танилцуулга болон нээлттэй ажлын байр бүрийн мэдээллийг тусад нь удирдана."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Хуудасны гарчиг"
            value={page?.title ?? ""}
            onChange={(value) => updatePage({ title: value })}
          />
          <label className="flex h-[43px] items-center gap-2 self-end text-[12px] font-semibold text-[#414942]">
            <input
              type="checkbox"
              checked={page?.enabled ?? false}
              onChange={(event) =>
                updatePage({ enabled: event.target.checked })
              }
              className="accent-[#eb762f]"
            />
            Идэвхтэй
          </label>
          <div className="md:col-span-2">
            <RichTextEditor
              label="Ерөнхий танилцуулга"
              value={page?.description ?? ""}
              onChange={(value) => updatePage({ description: value })}
            />
          </div>
        </div>
      </Panel>
      <Panel title="Нээлттэй ажлын байрууд">
        <div className="space-y-4">
          {(page?.careers ?? []).map((opening, index) => (
            <section
              key={opening.id}
              className="space-y-4 rounded-md border border-[#e4e8e3] p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[12px] font-bold">
                  Ажлын байр {index + 1}
                </h3>
                <button
                  type="button"
                  aria-label={`${opening.title || `Ажлын байр ${index + 1}`} устгах`}
                  onClick={() =>
                    updatePage({
                      careers: (page?.careers ?? []).filter(
                        (item) => item.id !== opening.id,
                      ),
                    })
                  }
                  className="grid h-8 w-8 place-items-center rounded border text-[#8d9690] hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Албан тушаал"
                  value={opening.title}
                  onChange={(value) =>
                    updateOpening(opening.id, { title: value })
                  }
                />
                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-semibold text-[#414942]">
                    Авах ажилтны тоо
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={opening.headcount ?? 1}
                    onChange={(event) =>
                      updateOpening(opening.id, {
                        headcount: Math.max(1, Number(event.target.value) || 1),
                      })
                    }
                    className="w-full rounded-md border border-[#dfe4df] bg-white px-3 py-2.5 text-[13px] text-[#202a24] outline-none focus:border-[#eb762f] focus:ring-2 focus:ring-[#eb762f]/10"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-semibold text-[#414942]">
                    Анкет авах хугацаа
                  </span>
                  <input
                    type="date"
                    value={opening.applicationDeadline ?? ""}
                    onChange={(event) =>
                      updateOpening(opening.id, {
                        applicationDeadline: event.target.value,
                      })
                    }
                    className="w-full rounded-md border border-[#dfe4df] bg-white px-3 py-2.5 text-[13px] text-[#202a24] outline-none focus:border-[#eb762f] focus:ring-2 focus:ring-[#eb762f]/10"
                  />
                </label>
                <div className="md:col-span-2">
                  <RichTextEditor
                    label="Гүйцэтгэх ерөнхий үүрэг"
                    value={opening.duties ?? opening.description ?? ""}
                    onChange={(value) =>
                      updateOpening(opening.id, { duties: value })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <RichTextEditor
                    label="Ажлын байранд тавигдах шаардлага"
                    value={opening.requirements ?? ""}
                    onChange={(value) =>
                      updateOpening(opening.id, { requirements: value })
                    }
                  />
                </div>
              </div>
            </section>
          ))}
        </div>
        <button
          type="button"
          onClick={addOpening}
          className="mt-4 inline-flex items-center gap-2 rounded border border-[#dfe4df] px-3 py-2.5 text-[11px] font-bold"
        >
          <Plus size={14} /> Ажлын байр нэмэх
        </button>
      </Panel>
    </AdminFrame>
  );
}
