"use client";
import { Boxes, Menu, Package, Truck } from "lucide-react";
import AdminFrame, { Panel, useAdminContent } from "./AdminFrame";
export default function AdminOverview() {
  const [content] = useAdminContent();
  const stats = [
    [Menu, "Идэвхтэй цэс", content.menu.filter((item) => item.enabled).length],
    [Package, "Бүтээгдэхүүн", content.products.length],
    [
      Boxes,
      "Онцлох бараа",
      content.products.filter((item) => item.featured).length,
    ],
    [Truck, "Ангилал", content.categories.length],
  ] as const;
  return (
    <AdminFrame section="overview" title="Сайтын агуулга">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[.13em] text-[#e77735]">
          Тойм
        </p>
        <h2 className="mt-1 text-[23px] font-black">Тавтай морил, админ</h2>
        <p className="mt-1 text-[12px] text-[#838d84]">
          Сайтын агуулгаа нэг дороос удирдаарай.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map(([Icon, name, value]) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-lg border border-[#e4e8e3] bg-white p-4"
          >
            <div className="grid h-9 w-9 place-items-center rounded bg-[#fff1e8] text-[#e77735]">
              <Icon size={17} />
            </div>
            <div>
              <div className="text-[10px] text-[#89938a]">{name}</div>
              <div className="text-[18px] font-black">{value}</div>
            </div>
          </div>
        ))}
      </div>
      <Panel title="Удирдлагын хэсгүүд">
        <p className="text-[12px] text-[#68736a]">
          Зүүн талын цэснээс шаардлагатай хуудсаа сонгож мэдээллээ шинэчилнэ үү.
        </p>
      </Panel>
    </AdminFrame>
  );
}
