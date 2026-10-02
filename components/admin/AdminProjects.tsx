"use client";

import { Plus, Trash2 } from "lucide-react";
import { useAdminContent, Field, Panel } from "./AdminFrame";
import AdminFrame from "./AdminFrame";
import AdminImageField from "./AdminImageField";
import RichTextEditor from "./RichTextEditor";
import type { AboutProject, SiteContent } from "@/lib/site-content";

export default function AdminProjects() {
  const [content, setContent] = useAdminContent();
  const page = content.aboutPages.find((item) => item.id === "about-projects");

  function updatePage(updates: Partial<SiteContent["aboutPages"][number]>) {
    setContent((current) => ({
      ...current,
      aboutPages: current.aboutPages.map((item) =>
        item.id === "about-projects" ? { ...item, ...updates } : item,
      ),
    }));
  }

  function updateProject(id: string, updates: Partial<AboutProject>) {
    updatePage({
      projects: (page?.projects ?? []).map((project) =>
        project.id === id ? { ...project, ...updates } : project,
      ),
    });
  }

  function addProject() {
    const project: AboutProject = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      image: "",
    };
    updatePage({ projects: [...(page?.projects ?? []), project] });
  }

  return (
    <AdminFrame section="about" title="Оролцсон төсөл">
      <Panel
        title="Төслийн хуудас"
        description="Хуудасны гарчиг, танилцуулга болон төсөл бүрийн зураг, гарчиг, тайлбарыг удирдана."
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
              label="Танилцуулга"
              value={page?.description ?? ""}
              onChange={(value) => updatePage({ description: value })}
            />
          </div>
        </div>
      </Panel>
      <Panel title="Төслүүд">
        <div className="space-y-5">
          {(page?.projects ?? []).map((project, index) => (
            <section
              key={project.id}
              className="space-y-4 rounded-md border border-[#e4e8e3] p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[12px] font-bold">Төсөл {index + 1}</h3>
                <button
                  type="button"
                  aria-label={`${project.title || `Төсөл ${index + 1}`} устгах`}
                  onClick={() =>
                    updatePage({
                      projects: (page?.projects ?? []).filter(
                        (item) => item.id !== project.id,
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
                  label="Гарчиг"
                  value={project.title}
                  onChange={(value) =>
                    updateProject(project.id, { title: value })
                  }
                />
                <AdminImageField
                  label="Зураг"
                  value={project.image}
                  onChange={(value) =>
                    updateProject(project.id, { image: value })
                  }
                />
                <div className="md:col-span-2">
                  <RichTextEditor
                    label="Тайлбар"
                    value={project.description}
                    onChange={(value) =>
                      updateProject(project.id, { description: value })
                    }
                  />
                </div>
              </div>
            </section>
          ))}
        </div>
        <button
          type="button"
          onClick={addProject}
          className="mt-4 inline-flex items-center gap-2 rounded border border-[#dfe4df] px-3 py-2.5 text-[11px] font-bold"
        >
          <Plus size={14} /> Төсөл нэмэх
        </button>
      </Panel>
    </AdminFrame>
  );
}
