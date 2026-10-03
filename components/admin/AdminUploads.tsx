"use client";
import { ChangeEvent, useState } from "react";
import { Check, FileImage, Upload } from "lucide-react";
import { getAdminAccessToken } from "@/lib/supabase";
import AdminFrame, { Panel } from "./AdminFrame";

export default function AdminUploads() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [error, setError] = useState("");

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 5_000_000) {
      setError("Эх зураг 5 МБ-аас бага байх ёстой.");
      return;
    }

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
        name?: string;
        url?: string;
        error?: string;
      };
      if (!response.ok || !result.url)
        throw new Error(result.error ?? "Зураг хадгалж чадсангүй.");
      setUploaded({ name: result.name ?? file.name, url: result.url });
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

  return (
    <AdminFrame section="uploads" title="Зураг / Uploads">
      <Panel
        title="Зураг upload хийх"
        description="Зураг автоматаар WebP болж public/uploads фолдерт хадгалагдана."
      >
        <label className="inline-flex cursor-pointer items-center gap-2 rounded bg-[#ed762f] px-3.5 py-2.5 text-[11px] font-bold text-white hover:bg-[#dc6421]">
          <Upload size={14} /> {uploading ? "Хадгалж байна..." : "Зураг сонгох"}
          <input
            type="file"
            accept="image/*"
            onChange={upload}
            disabled={uploading}
            className="sr-only"
          />
        </label>
        {error && (
          <p role="alert" className="mt-3 text-[11px] text-red-600">
            {error}
          </p>
        )}
        {uploaded && (
          <div className="mt-5 flex items-center gap-4 rounded border border-green-200 bg-green-50 p-3">
            <div className="grid h-16 w-20 place-items-center overflow-hidden rounded bg-white">
              <img
                src={uploaded.url}
                alt={uploaded.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="flex items-center gap-1 text-[12px] font-semibold text-green-800">
                <Check size={14} /> Амжилттай хадгаллаа
              </p>
              <p className="mt-1 text-[10px] text-green-700">{uploaded.name}</p>
              <a
                href={uploaded.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-[10px] text-green-800 underline"
              >
                <FileImage size={12} /> {uploaded.url}
              </a>
            </div>
          </div>
        )}
      </Panel>
    </AdminFrame>
  );
}
