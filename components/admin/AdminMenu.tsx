"use client";

import AdminFrame, { Field, Panel, useAdminContent } from "./AdminFrame";

export default function AdminMenu() {
  const [content, setContent] = useAdminContent(false);

  function updateMenuItem(
    index: number,
    field: "label" | "href" | "enabled",
    value: string | boolean,
  ) {
    setContent((current) => ({
      ...current,
      menu: current.menu.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function updateChild(
    parentIndex: number,
    childIndex: number,
    field: "label" | "href" | "enabled",
    value: string | boolean,
  ) {
    setContent((current) => ({
      ...current,
      menu: current.menu.map((item, itemIndex) =>
        itemIndex === parentIndex
          ? {
              ...item,
              children: item.children?.map((child, nestedIndex) =>
                nestedIndex === childIndex
                  ? { ...child, [field]: value }
                  : child,
              ),
            }
          : item,
      ),
    }));
  }

  async function saveMenu() {
    const { saveSiteContent } = await import("@/lib/site-content");
    await saveSiteContent(content);
  }

  return (
    <AdminFrame section="menu" title="Цэс удирдах" onSave={saveMenu}>
      <Panel
        title="Үндсэн цэс"
        description="Цэсний бүтэц тогтмол. Нэр, холбоос болон харагдах байдлыг засварлана уу."
      >
        <div className="space-y-4">
          {content.menu.map((item, index) => (
            <div key={item.id} className="rounded border border-[#e9ede8] p-4">
              <div className="grid items-end gap-3 sm:grid-cols-[1fr_1fr_auto]">
                <Field
                  label="Цэсний нэр"
                  value={item.label}
                  onChange={(value) => updateMenuItem(index, "label", value)}
                />
                <Field
                  label="Холбоос"
                  value={item.href}
                  onChange={(value) => updateMenuItem(index, "href", value)}
                />
                <label className="flex h-10 items-center gap-2 text-[11px]">
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={(event) =>
                      updateMenuItem(index, "enabled", event.target.checked)
                    }
                  />{" "}
                  Идэвхтэй
                </label>
              </div>
              {item.children?.length ? (
                <div className="mt-4 space-y-3 border-l-2 border-orange-200 pl-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#e77735]">
                    Танилцуулгын дэд цэс
                  </p>
                  {item.children.map((child, childIndex) => (
                    <div
                      key={child.id}
                      className="grid items-end gap-3 rounded border border-dashed border-[#e9ede8] bg-[#fafbf9] p-3 sm:grid-cols-[1fr_1fr_auto]"
                    >
                      <Field
                        label="Дэд цэсний нэр"
                        value={child.label}
                        onChange={(value) =>
                          updateChild(index, childIndex, "label", value)
                        }
                      />
                      <Field
                        label="Холбоос"
                        value={child.href}
                        onChange={(value) =>
                          updateChild(index, childIndex, "href", value)
                        }
                      />
                      <label className="flex h-10 items-center gap-2 text-[11px]">
                        <input
                          type="checkbox"
                          checked={child.enabled}
                          onChange={(event) =>
                            updateChild(
                              index,
                              childIndex,
                              "enabled",
                              event.target.checked,
                            )
                          }
                        />{" "}
                        Идэвхтэй
                      </label>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Panel>
    </AdminFrame>
  );
}
