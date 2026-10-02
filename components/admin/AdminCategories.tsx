"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  deleteCategory as deleteCategoryRemote,
  saveSiteContent,
} from "@/lib/site-content";
import AdminFrame, { Field, Panel, useAdminContent } from "./AdminFrame";

export default function AdminCategories() {
  const [content, setContent] = useAdminContent(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function saveCategories() {
    setSaving(true);
    try {
      await saveSiteContent(content);
      setError("");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Ангилал хадгалж чадсангүй.",
      );
    } finally {
      setSaving(false);
    }
  }

  function addCategory(parent?: string) {
    setContent((current) => {
      const base = parent ? "Шинэ дэд ангилал" : "Шинэ үндсэн ангилал";
      let name = base;
      let index = 2;
      while (current.categories.includes(name)) {
        name = `${base} ${index++}`;
      }
      return {
        ...current,
        categories: [...current.categories, name],
        categoryParents: parent
          ? { ...current.categoryParents, [name]: parent }
          : current.categoryParents,
      };
    });
  }

  function renameCategory(index: number, name: string) {
    setContent((current) => {
      const oldName = current.categories[index];
      const categoryParents = { ...current.categoryParents };
      const oldParent = categoryParents[oldName];
      delete categoryParents[oldName];
      if (oldParent) categoryParents[name] = oldParent;
      for (const [childName, parentName] of Object.entries(categoryParents)) {
        if (parentName === oldName) categoryParents[childName] = name;
      }
      return {
        ...current,
        categories: current.categories.map((item, itemIndex) =>
          itemIndex === index ? name : item,
        ),
        categoryParents,
      };
    });
  }

  async function removeCategory(category: string) {
    await deleteCategoryRemote(category);
    setContent((current) => ({
      ...current,
      categories: current.categories.filter((item) => item !== category),
      categoryParents: Object.fromEntries(
        Object.entries(current.categoryParents).filter(
          ([child, parent]) => child !== category && parent !== category,
        ),
      ),
    }));
  }

  const mainCategories = content.categories.filter(
    (category) =>
      !content.categoryParents[category] ||
      !content.categories.includes(content.categoryParents[category]),
  );

  return (
    <AdminFrame section="categories" title="Ангилал" onSave={saveCategories}>
      <Panel
        title="Бүтээгдэхүүний ангилал"
        description="Эхлээд үндсэн ангилал нэмээд, тухайн ангиллын доороос дэд ангиллыг нэмнэ. Дэд ангилал заавал биш."
      >
        {error && (
          <p
            role="alert"
            className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700"
          >
            {error}
          </p>
        )}
        <div className="space-y-4">
          {mainCategories.map((category) => {
            const categoryIndex = content.categories.indexOf(category);
            const children = content.categories
              .map((name, index) => ({ name, index }))
              .filter(({ name }) => content.categoryParents[name] === category);

            return (
              <section
                key={categoryIndex}
                className="rounded-md border border-[#e4e8e3] p-4"
              >
                <div className="grid items-end gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
                  <Field
                    label="Үндсэн ангилал"
                    value={category}
                    onChange={(value) => renameCategory(categoryIndex, value)}
                  />
                  <button
                    type="button"
                    onClick={() => addCategory(category)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded border border-[#dfe4df] px-3 text-[11px] font-bold"
                  >
                    <Plus size={14} /> Дэд ангилал нэмэх
                  </button>
                  <button
                    type="button"
                    aria-label={`${category} үндсэн ангиллыг устгах`}
                    onClick={() => removeCategory(category)}
                    className="grid h-10 w-10 place-items-center rounded border border-[#dfe4df] text-[#8d9690] hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                {children.length > 0 && (
                  <div className="ml-3 mt-4 space-y-3 border-l-2 border-[#f0b08c] pl-4">
                    {children.map(({ name, index }) => (
                      <div
                        key={index}
                        className="grid items-end gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
                      >
                        <Field
                          label="Дэд ангилал"
                          value={name}
                          onChange={(value) => renameCategory(index, value)}
                        />
                        <button
                          type="button"
                          aria-label={`${name} дэд ангиллыг устгах`}
                          onClick={() => removeCategory(name)}
                          className="grid h-10 w-10 place-items-center rounded border border-[#dfe4df] text-[#8d9690] hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => addCategory()}
          className="mt-4 inline-flex items-center gap-2 rounded border border-[#dfe4df] px-3 py-2.5 text-[11px] font-bold"
        >
          <Plus size={14} /> Үндсэн ангилал нэмэх
        </button>
        {saving && (
          <p className="mt-3 text-[11px] text-[#89938a]">Хадгалж байна...</p>
        )}
      </Panel>
    </AdminFrame>
  );
}
