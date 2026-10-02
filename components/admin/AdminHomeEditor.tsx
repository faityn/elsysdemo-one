"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  FileImage,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useAdminContent, Field, Panel } from "./AdminFrame";
import AdminFrame from "./AdminFrame";
import AdminImageField from "./AdminImageField";
import RichTextEditor from "./RichTextEditor";
import type {
  SpecialProductFeature,
  SpecialProductSlide,
  TrustItem,
} from "@/lib/site-content";

type EditorSelection =
  | { type: "hero" }
  | { type: "trust"; id: string }
  | { type: "slide"; id: string };

const rowClass =
  "flex w-full items-center gap-3 border-b border-[#edf0ec] py-3 text-left last:border-0";
const rowButtonClass =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#dfe4df] text-[#68736a] hover:border-[#ed762f] hover:text-[#d95610]";

export default function AdminHomeEditor() {
  const [content, setContent] = useAdminContent();
  const [selection, setSelection] = useState<EditorSelection | null>(null);

  function updateTrust(id: string, updates: Partial<TrustItem>) {
    setContent((current) => ({
      ...current,
      trustItems: current.trustItems.map((item, itemIndex) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    }));
  }

  function addTrustItem() {
    const item: TrustItem = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
    };
    setContent((current) => ({
      ...current,
      trustItems: [...current.trustItems, item],
    }));
    setSelection({ type: "trust", id: item.id });
  }

  function deleteTrustItem(id: string) {
    if (!window.confirm("Энэ давуу талыг устгах уу?")) return;
    setContent((current) => ({
      ...current,
      trustItems: current.trustItems.filter((item) => item.id !== id),
    }));
    setSelection(null);
  }

  function updateSlide(id: string, updates: Partial<SpecialProductSlide>) {
    setContent((current) => ({
      ...current,
      specialProducts: current.specialProducts.map((slide) =>
        slide.id === id ? { ...slide, ...updates } : slide,
      ),
    }));
  }

  function updateFeature(
    slideId: string,
    featureId: string,
    updates: Partial<SpecialProductFeature>,
  ) {
    setContent((current) => ({
      ...current,
      specialProducts: current.specialProducts.map((slide) =>
        slide.id === slideId
          ? {
              ...slide,
              features: slide.features.map((feature) =>
                feature.id === featureId ? { ...feature, ...updates } : feature,
              ),
            }
          : slide,
      ),
    }));
  }

  function addSlide() {
    const slide: SpecialProductSlide = {
      id: crypto.randomUUID(),
      category: "",
      title: "",
      description: "",
      image: "",
      linkLabel: "Дэлгэрэнгүй",
      linkHref: "#products",
      features: [],
    };
    setContent((current) => ({
      ...current,
      specialProducts: [...current.specialProducts, slide],
    }));
    setSelection({ type: "slide", id: slide.id });
  }

  function deleteSlide(id: string) {
    if (!window.confirm("Энэ слайдыг устгах уу?")) return;
    setContent((current) => ({
      ...current,
      specialProducts: current.specialProducts.filter(
        (slide) => slide.id !== id,
      ),
    }));
    setSelection(null);
  }

  function addFeature(slide: SpecialProductSlide) {
    const feature: SpecialProductFeature = {
      id: crypto.randomUUID(),
      icon: "bolt",
      title: "",
      description: "",
    };
    updateSlide(slide.id, { features: [...slide.features, feature] });
  }

  const selectedTrust =
    selection?.type === "trust"
      ? content.trustItems.find((item) => item.id === selection.id)
      : undefined;
  const selectedSlide =
    selection?.type === "slide"
      ? content.specialProducts.find((slide) => slide.id === selection.id)
      : undefined;

  return (
    <AdminFrame section="home" title="Нүүр хуудас">
      {selection && (
        <button
          type="button"
          onClick={() => setSelection(null)}
          className="inline-flex items-center gap-2 text-[11px] font-bold text-[#68736a] hover:text-[#d95610]"
        >
          <ArrowLeft size={14} /> Хэсгүүдийн жагсаалт
        </button>
      )}

      {!selection && (
        <div className="space-y-5">
          <Panel title="Нүүр хуудасны хэсгүүд">
            <button
              type="button"
              onClick={() => setSelection({ type: "hero" })}
              className={rowClass}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded bg-[#fff4ec] text-[#d95610]">
                <FileImage size={17} />
              </span>
              <span className="min-w-0 flex-1">
                <strong className="block text-[12px]">Нүүр баннер</strong>
                <span className="mt-1 block truncate text-[11px] text-[#89938a]">
                  {content.hero.title || "Гарчиг тохируулаагүй"}
                </span>
              </span>
              <Pencil size={14} className="text-[#89938a]" />
              <ChevronRight size={16} className="text-[#89938a]" />
            </button>
          </Panel>

          <Panel title="Давуу талууд">
            {content.trustItems.map((item, index) => (
              <div key={item.id} className={rowClass}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded bg-[#f3f5f1] text-[#68736a]">
                  <ShieldCheck size={17} />
                </span>
                <button
                  type="button"
                  onClick={() => setSelection({ type: "trust", id: item.id })}
                  className="min-w-0 flex-1 text-left"
                >
                  <strong className="block truncate text-[12px]">
                    {item.title || `Давуу тал ${index + 1}`}
                  </strong>
                  <span className="mt-1 block truncate text-[11px] text-[#89938a]">
                    {item.description || "Тайлбар оруулаагүй"}
                  </span>
                </button>
                <button
                  type="button"
                  aria-label={`${item.title || "Давуу тал"} устгах`}
                  onClick={() => deleteTrustItem(item.id)}
                  className={rowButtonClass}
                >
                  <Trash2 size={14} />
                </button>
                <button
                  type="button"
                  aria-label={`${item.title || "Давуу тал"} засах`}
                  onClick={() => setSelection({ type: "trust", id: item.id })}
                  className={rowButtonClass}
                >
                  <Pencil size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTrustItem}
              className="mt-3 inline-flex items-center gap-2 rounded border border-[#dfe4df] px-3 py-2 text-[11px] font-bold"
            >
              <Plus size={14} /> Давуу тал нэмэх
            </button>
          </Panel>

          <Panel
            title="SpecialProduct слайд"
            description="Слайдын жагсаалтаас засах эсвэл устгах; шинэ слайд нэмэх боломжтой."
          >
            {content.specialProducts.map((slide, index) => (
              <div key={slide.id} className={rowClass}>
                {slide.image ? (
                  <img
                    src={slide.image}
                    alt=""
                    className="h-10 w-14 shrink-0 rounded border border-[#e4e8e3] object-cover"
                  />
                ) : (
                  <span className="grid h-10 w-14 shrink-0 place-items-center rounded border border-[#e4e8e3] text-[10px] text-[#89938a]">
                    Зураг
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setSelection({ type: "slide", id: slide.id })}
                  className="min-w-0 flex-1 text-left"
                >
                  <strong className="block truncate text-[12px]">
                    {slide.title || `Слайд ${index + 1}`}
                  </strong>
                  <span className="mt-1 block truncate text-[11px] text-[#89938a]">
                    {slide.category || "Ангилал оруулаагүй"}
                  </span>
                </button>
                <button
                  type="button"
                  aria-label={`${slide.title || `Слайд ${index + 1}`} устгах`}
                  onClick={() => deleteSlide(slide.id)}
                  className={rowButtonClass}
                >
                  <Trash2 size={14} />
                </button>
                <button
                  type="button"
                  aria-label={`${slide.title || `Слайд ${index + 1}`} засах`}
                  onClick={() => setSelection({ type: "slide", id: slide.id })}
                  className={rowButtonClass}
                >
                  <Pencil size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSlide}
              className="mt-3 inline-flex items-center gap-2 rounded border border-[#dfe4df] px-3 py-2 text-[11px] font-bold"
            >
              <Plus size={14} /> Слайд нэмэх
            </button>
          </Panel>
        </div>
      )}

      {selection?.type === "hero" && (
        <Panel title="Нүүр баннер">
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Дээд тайлбар"
              value={content.hero.eyebrow}
              onChange={(value) =>
                setContent((current) => ({
                  ...current,
                  hero: { ...current.hero, eyebrow: value },
                }))
              }
            />
            <Field
              label="Гарчиг"
              value={content.hero.title}
              onChange={(value) =>
                setContent((current) => ({
                  ...current,
                  hero: { ...current.hero, title: value },
                }))
              }
            />
            <Field
              label="Онцлох гарчиг"
              value={content.hero.accent}
              onChange={(value) =>
                setContent((current) => ({
                  ...current,
                  hero: { ...current.hero, accent: value },
                }))
              }
            />
            <Field
              label="Зураг"
              value={content.hero.image}
              onChange={(value) =>
                setContent((current) => ({
                  ...current,
                  hero: { ...current.hero, image: value },
                }))
              }
            />
            <div className="md:col-span-2">
              <RichTextEditor
                label="Тайлбар"
                value={content.hero.description}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    hero: { ...current.hero, description: value },
                  }))
                }
              />
            </div>
          </div>
        </Panel>
      )}

      {selection?.type === "trust" && selectedTrust && (
        <Panel title="Давуу тал засах">
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Гарчиг"
              value={selectedTrust.title}
              onChange={(value) => updateTrust(selection.id, { title: value })}
            />
            <Field
              label="Тайлбар"
              value={selectedTrust.description}
              onChange={(value) =>
                updateTrust(selection.id, { description: value })
              }
            />
            <button
              type="button"
              onClick={() => deleteTrustItem(selection.id)}
              className="inline-flex h-10 items-center gap-2 justify-self-start rounded border border-red-200 px-3 text-[11px] font-semibold text-red-700 hover:bg-red-50"
            >
              <Trash2 size={14} /> Устгах
            </button>
          </div>
        </Panel>
      )}

      {selection?.type === "slide" && selectedSlide && (
        <Panel title={selectedSlide.title || "Слайд засах"}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Ангиллын текст"
              value={selectedSlide.category}
              onChange={(value) =>
                updateSlide(selectedSlide.id, { category: value })
              }
            />
            <Field
              label="Гарчиг"
              value={selectedSlide.title}
              onChange={(value) =>
                updateSlide(selectedSlide.id, { title: value })
              }
            />
            <AdminImageField
              label="Зураг"
              value={selectedSlide.image}
              onChange={(value) =>
                updateSlide(selectedSlide.id, { image: value })
              }
            />
            <div className="md:col-span-2">
              <RichTextEditor
                label="Тайлбар"
                value={selectedSlide.description}
                onChange={(value) =>
                  updateSlide(selectedSlide.id, { description: value })
                }
              />
            </div>
            <Field
              label="Товчны текст"
              value={selectedSlide.linkLabel}
              onChange={(value) =>
                updateSlide(selectedSlide.id, { linkLabel: value })
              }
            />
            <Field
              label="Товчны холбоос"
              value={selectedSlide.linkHref}
              onChange={(value) =>
                updateSlide(selectedSlide.id, { linkHref: value })
              }
            />
          </div>
          <div className="mt-6 space-y-3 border-t border-[#edf0ec] pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[12px] font-bold">Үзүүлэлтүүд</h3>
              <button
                type="button"
                onClick={() => addFeature(selectedSlide)}
                className="inline-flex items-center gap-1 rounded border border-[#dfe4df] px-2.5 py-1.5 text-[10px] font-semibold"
              >
                <Plus size={12} /> Үзүүлэлт нэмэх
              </button>
            </div>
            {selectedSlide.features.map((feature) => (
              <div
                key={feature.id}
                className="grid items-end gap-3 rounded border border-[#edf0ec] bg-[#fafbf9] p-3 sm:grid-cols-[120px_1fr_1fr_auto]"
              >
                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-semibold text-[#414942]">
                    Icon
                  </span>
                  <select
                    value={feature.icon}
                    onChange={(event) =>
                      updateFeature(selectedSlide.id, feature.id, {
                        icon: event.target
                          .value as SpecialProductFeature["icon"],
                      })
                    }
                    className="w-full rounded-md border border-[#dfe4df] bg-white px-2 py-2.5 text-[12px]"
                  >
                    <option value="lightbulb">Гэрэл</option>
                    <option value="shield">Хамгаалалт</option>
                    <option value="clock">Хугацаа</option>
                    <option value="bolt">Хүчин чадал</option>
                  </select>
                </label>
                <Field
                  label="Үзүүлэлт"
                  value={feature.title}
                  onChange={(value) =>
                    updateFeature(selectedSlide.id, feature.id, {
                      title: value,
                    })
                  }
                />
                <Field
                  label="Тайлбар"
                  value={feature.description}
                  onChange={(value) =>
                    updateFeature(selectedSlide.id, feature.id, {
                      description: value,
                    })
                  }
                />
                <button
                  type="button"
                  aria-label="Үзүүлэлт устгах"
                  onClick={() =>
                    updateSlide(selectedSlide.id, {
                      features: selectedSlide.features.filter(
                        (item) => item.id !== feature.id,
                      ),
                    })
                  }
                  className={rowButtonClass}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => deleteSlide(selectedSlide.id)}
            className="mt-6 inline-flex h-10 items-center gap-2 rounded border border-red-200 px-3 text-[11px] font-semibold text-red-700 hover:bg-red-50"
          >
            <Trash2 size={14} /> Слайд устгах
          </button>
        </Panel>
      )}
    </AdminFrame>
  );
}
