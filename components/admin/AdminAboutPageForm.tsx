"use client";

import { ArrowRight } from "lucide-react";
import { useAdminContent, Field, Panel } from "./AdminFrame";
import AdminFrame from "./AdminFrame";
import RichTextEditor from "./RichTextEditor";

export default function AdminAboutPageForm({ pageId }: { pageId: string }) {
  const [content, setContent] = useAdminContent();
  const page =
    content.aboutPages.find((item) => item.id === pageId) ??
    content.aboutPages[0];
  const pageIndex = content.aboutPages.findIndex((item) => item.id === page.id);

  function update(
    field: "title" | "description" | "enabled",
    value: string | boolean,
  ) {
    setContent((current) => ({
      ...current,
      aboutPages: current.aboutPages.map((item, index) =>
        index === pageIndex ? { ...item, [field]: value } : item,
      ),
    }));
  }

  return (
    <AdminFrame section="about" title={page?.title}>
      <a
        href="/admin/about"
        className="inline-flex items-center gap-2 text-[11px] font-bold text-[#68736a] hover:text-[#e77735]"
      >
        Танилцуулга руу буцах <ArrowRight size={13} />
      </a>
      <Panel
        title={`${page?.title} мэдээлэл`}
        description={
          page?.id === "about-company"
            ? "Энэ мэдээлэл submenu хуудас болон нүүрний Бидний тухай хэсэгт харагдана."
            : "Энэ мэдээлэл public сайтын тухайн submenu хуудас дээр харагдана."
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Гарчиг"
            value={page?.title}
            onChange={(value) => update("title", value)}
          />
          <label className="flex h-[43px] items-center gap-2 self-end text-[12px] font-semibold text-[#414942]">
            <input
              type="checkbox"
              checked={page?.enabled}
              onChange={(event) => update("enabled", event.target.checked)}
              className="accent-[#eb762f]"
            />{" "}
            Идэвхтэй
          </label>
          <div className="md:col-span-2">
            <RichTextEditor
              label="Тайлбар"
              value={page?.description ?? ""}
              onChange={(value) => update("description", value)}
            />
          </div>
        </div>
      </Panel>
    </AdminFrame>
  );
}
