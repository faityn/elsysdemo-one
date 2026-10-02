"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { deleteProduct as deleteProductRemote } from "@/lib/site-content";
import AdminFrame, { Panel, useAdminContent } from "./AdminFrame";

type ProductFilters = {
  name: string;
  sku: string;
  category: string;
  page: number;
};

const pageSize = 10;

export default function AdminProducts() {
  const [content, setContent] = useAdminContent();
  const products = [...content.products].reverse();
  const [filters, setFilters] = useState<ProductFilters>({
    name: "",
    sku: "",
    category: "",
    page: 1,
  });

  useEffect(() => {
    function readUrlFilters() {
      const params = new URLSearchParams(window.location.search);
      setFilters({
        name: params.get("name") ?? "",
        sku: params.get("sku") ?? "",
        category: params.get("category") ?? "",
        page: Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1),
      });
    }
    readUrlFilters();
    window.addEventListener("popstate", readUrlFilters);
    return () => window.removeEventListener("popstate", readUrlFilters);
  }, []);

  function writeFilters(nextFilters: ProductFilters, push = false) {
    const params = new URLSearchParams();
    if (nextFilters.name) params.set("name", nextFilters.name);
    if (nextFilters.sku) params.set("sku", nextFilters.sku);
    if (nextFilters.category) params.set("category", nextFilters.category);
    if (nextFilters.page > 1) params.set("page", String(nextFilters.page));
    const query = params.toString();
    const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
    if (push) window.history.pushState({}, "", url);
    else window.history.replaceState({}, "", url);
    setFilters(nextFilters);
  }

  function updateFilter(field: "name" | "sku" | "category", value: string) {
    writeFilters({ ...filters, [field]: value, page: 1 });
  }

  const normalizedName = filters.name.trim().toLocaleLowerCase();
  const normalizedSku = filters.sku.trim().toLocaleLowerCase();
  const filteredProducts = products.filter((product) => {
    return (
      (!normalizedName ||
        product.name.toLocaleLowerCase().includes(normalizedName)) &&
      (!normalizedSku ||
        product.sku.toLocaleLowerCase().includes(normalizedSku)) &&
      (!filters.category || product.category === filters.category)
    );
  });
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(filters.page, pageCount);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const categoryOptions = Array.from(
    new Set([
      ...content.categories,
      ...content.products.map((product) => product.category).filter(Boolean),
    ]),
  );
  const mainCategories = categoryOptions.filter(
    (category) =>
      !content.categoryParents[category] ||
      !categoryOptions.includes(content.categoryParents[category]),
  );

  return (
    <AdminFrame section="products" title="Бүтээгдэхүүн">
      <Panel
        title="Бүтээгдэхүүний жагсаалт"
        description={`${filteredProducts.length} бүтээгдэхүүн · ${currentPage} / ${pageCount} хуудас`}
        action={
          <a
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded bg-[#222222] px-3 py-2 text-[11px] font-bold text-white hover:bg-[#000000]"
          >
            <Plus size={14} /> Бүтээгдэхүүн нэмэх
          </a>
        }
      >
        <div className="mb-5 grid gap-3 rounded-md bg-[#f7f8f6] p-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <label className="block">
            <span className="mb-1 block text-[10px] font-semibold text-[#68736a]">
              Нэрээр хайх
            </span>
            <input
              value={filters.name}
              onChange={(event) => updateFilter("name", event.target.value)}
              placeholder="Бүтээгдэхүүний нэр"
              className="w-full rounded border border-[#dfe4df] bg-white px-3 py-2 text-[12px] outline-none focus:border-[#eb762f]"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[10px] font-semibold text-[#68736a]">
              Код / SKU-аар хайх
            </span>
            <input
              value={filters.sku}
              onChange={(event) => updateFilter("sku", event.target.value)}
              placeholder="Код"
              className="w-full rounded border border-[#dfe4df] bg-white px-3 py-2 text-[12px] outline-none focus:border-[#eb762f]"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[10px] font-semibold text-[#68736a]">
              Ангилал
            </span>
            <select
              value={filters.category}
              onChange={(event) => updateFilter("category", event.target.value)}
              className="w-full rounded border border-[#dfe4df] bg-white px-3 py-2 text-[12px] outline-none focus:border-[#eb762f]"
            >
              <option value="">Бүх ангилал</option>
              {mainCategories.map((mainCategory) => (
                <optgroup
                  key={mainCategory}
                  label={`Үндсэн ангилал: ${mainCategory}`}
                >
                  <option value={mainCategory}>
                    Үндсэн ангилал — {mainCategory}
                  </option>
                  {categoryOptions
                    .filter(
                      (category) =>
                        content.categoryParents[category] === mainCategory,
                    )
                    .map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        Дэд ангилал — {subcategory}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
          <button
            type="button"
            disabled={!filters.name && !filters.sku && !filters.category}
            onClick={() =>
              writeFilters({ name: "", sku: "", category: "", page: 1 })
            }
            className="inline-flex h-9 items-center justify-center gap-1 self-end rounded border border-[#dfe4df] px-3 text-[11px] font-semibold text-[#58625a] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X size={13} /> Цэвэрлэх
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-[12px]">
            <thead>
              <tr className="border-b text-[10px] uppercase text-[#89938a]">
                <th className="w-12 px-2 pb-3">№</th>
                <th className="px-2 pb-3">Зураг</th>
                <th className="px-2 pb-3">Нэр</th>
                <th className="px-2 pb-3">Код</th>
                <th className="px-2 pb-3">Ангилал</th>
                <th className="px-2 pb-3">Үнэ</th>
                <th className="w-28 px-2 pb-3">Шинэ</th>
                <th className="w-28 px-2 pb-3">Онцлох</th>
                <th className="w-24 px-2 pb-3" />
              </tr>
            </thead>
            <tbody>
              {visibleProducts.map((product, index) => (
                <tr key={product.id} className="border-b last:border-0">
                  <td className="px-2 py-3 text-[#89938a]">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-2 py-3">
                    <img
                      src={product.image}
                      alt=""
                      className="h-11 w-14 object-contain"
                    />
                  </td>
                  <td className="px-2 py-3 font-semibold">{product.name}</td>
                  <td className="px-2 py-3 text-[#68736a]">{product.sku}</td>
                  <td className="px-2 py-3">{product.category}</td>
                  <td className="px-2 py-3 font-semibold">{product.price}</td>
                  <td className="px-2 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        setContent((current) => ({
                          ...current,
                          products: current.products.map((item) =>
                            item.id === product.id
                              ? { ...item, isNew: !item.isNew }
                              : item,
                          ),
                        }))
                      }
                      className="rounded-full border px-2 py-1 text-[10px]"
                    >
                      {product.isNew ? "Шинэ" : "Шинэ болгох"}
                    </button>
                  </td>
                  <td className="px-2 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        setContent((current) => ({
                          ...current,
                          products: current.products.map((item) =>
                            item.id === product.id
                              ? { ...item, featured: !item.featured }
                              : item,
                          ),
                        }))
                      }
                      className="rounded-full border px-2 py-1 text-[10px]"
                    >
                      {product.featured ? "Онцлох" : "Онцлох болгох"}
                    </button>
                  </td>
                  <td className="px-2 py-3">
                    <a
                      href={`/admin/products/${product.id}/edit`}
                      aria-label="Бүтээгдэхүүн засах"
                      title="Бүтээгдэхүүн засах"
                      className="mr-1 inline-grid h-8 w-8 place-items-center rounded border"
                    >
                      <Pencil size={13} />
                    </a>
                    <button
                      type="button"
                      aria-label="Бүтээгдэхүүн устгах"
                      title="Бүтээгдэхүүн устгах"
                      onClick={async () => {
                        if (
                          !window.confirm(
                            `"${product.name}" бүтээгдэхүүнийг устгах уу?`,
                          )
                        ) {
                          return;
                        }
                        await deleteProductRemote(product.id);
                        setContent((current) => ({
                          ...current,
                          products: current.products.filter(
                            (item) => item.id !== product.id,
                          ),
                        }));
                      }}
                      className="inline-grid h-8 w-8 place-items-center rounded border"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
              {visibleProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-10 text-center text-[12px] text-[#89938a]"
                  >
                    Хайлтад тохирох бүтээгдэхүүн олдсонгүй.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <a
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded border px-3 py-2 text-[11px] font-bold"
          >
            <Plus size={14} /> Бүтээгдэхүүн нэмэх
          </a>
          <div className="flex items-center gap-2">
            <span className="mr-1 text-[11px] text-[#89938a]">
              {filteredProducts.length === 0
                ? "0 бүтээгдэхүүн"
                : `${(currentPage - 1) * pageSize + 1}–${Math.min(
                    currentPage * pageSize,
                    filteredProducts.length,
                  )} / ${filteredProducts.length}`}
            </span>
            <button
              type="button"
              aria-label="Өмнөх хуудас"
              disabled={currentPage <= 1}
              onClick={() =>
                writeFilters({ ...filters, page: currentPage - 1 }, true)
              }
              className="grid h-8 w-8 place-items-center rounded border border-[#dfe4df] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="min-w-12 text-center text-[11px] font-semibold">
              {currentPage} / {pageCount}
            </span>
            <button
              type="button"
              aria-label="Дараагийн хуудас"
              disabled={currentPage >= pageCount}
              onClick={() =>
                writeFilters({ ...filters, page: currentPage + 1 }, true)
              }
              className="grid h-8 w-8 place-items-center rounded border border-[#dfe4df] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </Panel>
    </AdminFrame>
  );
}
