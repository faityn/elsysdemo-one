"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ArrowLeft, Check, FileImage, Save, Upload } from "lucide-react";
import {
  defaultSiteContent,
  loadSiteContent,
  saveSiteContent,
  type Product,
} from "@/lib/site-content";
import AdminFrame, { Field, Panel } from "./AdminFrame";
import RichTextEditor from "./RichTextEditor";
import { getAdminAccessToken } from "@/lib/supabase";

export default function AdminProductForm({
  productId,
}: {
  productId?: string;
}) {
  const isEdit = Boolean(productId);
  const [product, setProduct] = useState<Product>({
    id: productId ?? `product-${Date.now()}`,
    name: "",
    sku: "",
    category: defaultSiteContent.categories[0] ?? "",
    price: "",
    image: "",
    description: "",
    isNew: false,
    featured: false,
  });
  const [categories, setCategories] = useState(defaultSiteContent.categories);
  const [categoryParents, setCategoryParents] = useState(
    defaultSiteContent.categoryParents,
  );
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const mainCategories = categories.filter(
    (category) =>
      !categoryParents[category] ||
      !categories.includes(categoryParents[category]),
  );
  const selectedMainCategory =
    categoryParents[product.category] ?? product.category;
  const subcategories = categories.filter(
    (category) => categoryParents[category] === selectedMainCategory,
  );

  useEffect(() => {
    loadSiteContent().then((content) => {
      setCategories(content.categories);
      setCategoryParents(content.categoryParents);
      const existing = productId
        ? content.products.find((item) => item.id === productId)
        : undefined;
      if (existing) setProduct(existing);
      setReady(true);
    });
  }, [productId]);

  function update<K extends keyof Product>(field: K, value: Product[K]) {
    setProduct((current) => ({ ...current, [field]: value }));
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.src = objectUrl;
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Зураг уншиж чадсангүй."));
      });
      const scale = Math.min(
        1,
        1800 / Math.max(image.naturalWidth, image.naturalHeight),
      );
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      canvas
        .getContext("2d")
        ?.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (result) =>
            result
              ? resolve(result)
              : reject(new Error("WebP хөрвүүлэлт амжилтгүй боллоо.")),
          "image/webp",
          0.86,
        ),
      );
      const formData = new FormData();
      formData.append(
        "file",
        new File([blob], `${file.name.replace(/\.[^/.]+$/, "")}.webp`, {
          type: "image/webp",
        }),
      );
      const accessToken = await getAdminAccessToken();
      const response = await fetch("/api/uploads", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });
      const result = (await response.json()) as {
        url?: string;
        error?: string;
      };
      if (!response.ok || !result.url)
        throw new Error(result.error ?? "Зураг хадгалж чадсангүй.");
      update("image", result.url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Зураг хадгалж чадсангүй.",
      );
    } finally {
      setUploading(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !product.name.trim() ||
      !product.sku.trim() ||
      !product.category ||
      !product.price.trim()
    ) {
      setError("Нэр, код, ангилал, үнэ талбаруудыг бөглөнө үү.");
      return;
    }
    setSaving(true);
    const content = await loadSiteContent();
    const products = isEdit
      ? content.products.map((item) =>
          item.id === product.id ? product : item,
        )
      : [...content.products, product];
    await saveSiteContent({ ...content, products });
    setError("");
    setMessage("Бүтээгдэхүүн амжилттай хадгалагдлаа.");
    window.setTimeout(() => {
      window.location.href = "/admin/products";
    }, 700);
    setSaving(false);
  }

  return (
    <AdminFrame
      section="products"
      title={isEdit ? "Бүтээгдэхүүн засах" : "Бүтээгдэхүүн нэмэх"}
    >
      <form onSubmit={submit} className="space-y-5">
        {message && (
          <div
            role="status"
            className="flex items-center gap-2 rounded border border-green-200 bg-green-50 px-4 py-3 text-[12px] font-semibold text-green-800"
          >
            <Check size={15} /> {message}
          </div>
        )}
        {error && (
          <div
            role="alert"
            className="rounded border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700"
          >
            {error}
          </div>
        )}
        <Panel
          title="Бүтээгдэхүүний мэдээлэл"
          description="Ангиллыг үүсгэсэн жагсаалтаас сонгоно уу."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Нэр"
              value={product.name}
              onChange={(value) => update("name", value)}
            />
            <Field
              label="Код"
              value={product.sku}
              onChange={(value) => update("sku", value)}
            />
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-semibold text-[#414942]">
                Үндсэн ангилал
              </span>
              <select
                value={
                  mainCategories.includes(selectedMainCategory)
                    ? selectedMainCategory
                    : ""
                }
                onChange={(event) => update("category", event.target.value)}
                className="w-full rounded-md border border-[#dfe4df] bg-white px-3 py-2.5 text-[13px] text-[#202a24] outline-none focus:border-[#eb762f] focus:ring-2 focus:ring-[#eb762f]/10"
              >
                <option value="">Үндсэн ангилал сонгох</option>
                {mainCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-semibold text-[#414942]">
                Дэд ангилал (заавал биш)
              </span>
              <select
                value={
                  categoryParents[product.category] === selectedMainCategory
                    ? product.category
                    : ""
                }
                disabled={
                  !mainCategories.includes(selectedMainCategory) ||
                  subcategories.length === 0
                }
                onChange={(event) =>
                  update("category", event.target.value || selectedMainCategory)
                }
                className="w-full rounded-md border border-[#dfe4df] bg-white px-3 py-2.5 text-[13px] text-[#202a24] outline-none focus:border-[#eb762f] focus:ring-2 focus:ring-[#eb762f]/10 disabled:cursor-not-allowed disabled:bg-[#f4f6f2] disabled:text-[#89938a]"
              >
                {!mainCategories.includes(selectedMainCategory) ? (
                  <option value="">Эхлээд үндсэн ангилал сонгоно уу</option>
                ) : subcategories.length === 0 ? (
                  <option value="">Дэд ангилал байхгүй</option>
                ) : (
                  <option value="">Дэд ангилал сонгохгүй</option>
                )}
                {subcategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <Field
              label="Үнэ"
              value={product.price}
              onChange={(value) => update("price", value)}
              placeholder="29,000"
            />
            <label className="flex h-[43px] items-center gap-2 self-end text-[12px] font-semibold text-[#414942]"></label>
            <label className="flex h-[43px] items-center gap-2 self-end text-[12px] font-semibold text-[#414942]">
              <input
                type="checkbox"
                checked={product.isNew}
                onChange={(event) => update("isNew", event.target.checked)}
                className="accent-[#eb762f]"
              />{" "}
              Шинэ бүтээгдэхүүн
            </label>
            <label className="flex h-[43px] items-center gap-2 self-end text-[12px] font-semibold text-[#414942]">
              <input
                type="checkbox"
                checked={product.featured}
                onChange={(event) => update("featured", event.target.checked)}
                className="accent-[#eb762f]"
              />{" "}
              Онцлох бүтээгдэхүүн
            </label>
          </div>
        </Panel>
        <Panel
          title="Дэлгэрэнгүй тайлбар"
          description="Хэрэглэгчийн талын бүтээгдэхүүний дэлгэрэнгүй хуудсанд харагдана."
        >
          <RichTextEditor
            label="Бүтээгдэхүүний тайлбар"
            value={product.description}
            onChange={(value) => update("description", value)}
          />
        </Panel>
        <Panel
          title="Бүтээгдэхүүний зураг"
          description="Зураг автоматаар WebP болж uploads фолдерт хадгалагдана."
        >
          <div className="flex flex-wrap items-start gap-4">
            <div className="grid h-36 w-44 place-items-center overflow-hidden rounded border border-[#e1e5e1] bg-[#f4f6f2]">
              {product.image ? (
                <img
                  src={product.image}
                  alt="Бүтээгдэхүүн"
                  className="h-full w-full object-contain"
                />
              ) : (
                <FileImage size={24} className="text-[#9ca69e" />
              )}
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded border border-[#dfe4df] bg-white px-3 py-2.5 text-[11px] font-semibold text-[#38433b] hover:bg-[#f6f7f4]">
              <Upload size={14} />{" "}
              {uploading ? "Upload хийж байна..." : "Зураг upload хийх"}
              <input
                type="file"
                accept="image/*"
                onChange={uploadImage}
                disabled={uploading}
                className="sr-only"
              />
            </label>
          </div>
        </Panel>
        <div className="flex justify-between border-t border-[#dfe4df] pt-4">
          <a
            href="/admin/products"
            className="inline-flex items-center gap-2 rounded border border-[#dfe4df] px-4 py-2.5 text-[11px] font-bold text-[#49544c]"
          >
            <ArrowLeft size={14} /> Буцах
          </a>
          <button
            type="submit"
            disabled={!ready || uploading || saving}
            className="inline-flex items-center gap-2 rounded bg-[#ed762f] px-4 py-2.5 text-[11px] font-bold text-white disabled:opacity-50"
          >
            <Save size={14} /> Хадгалах
          </button>
        </div>
      </form>
    </AdminFrame>
  );
}
