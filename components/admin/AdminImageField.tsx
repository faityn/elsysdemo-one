"use client";

import { ChangeEvent, useState } from "react";
import { Upload } from "lucide-react";
import { getAdminAccessToken } from "@/lib/supabase";
import { Field } from "./AdminFrame";

export default function AdminImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
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
    const objectUrl = URL.createObjectURL(file);
    try {
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
      onChange(result.url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Зураг хадгалж чадсангүй.",
      );
    } finally {
      URL.revokeObjectURL(objectUrl);
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <Field label={label} value={value} onChange={onChange} />
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded border border-[#dfe4df] bg-white px-3 py-2 text-[11px] font-semibold text-[#38433b] hover:bg-[#f6f7f4]">
          <Upload size={14} />{" "}
          {uploading ? "Upload хийж байна..." : "Зураг оруулах"}
          <input
            type="file"
            accept="image/*"
            onChange={upload}
            disabled={uploading}
            className="sr-only"
          />
        </label>
        {value && (
          <div className="h-16 w-24 overflow-hidden rounded border border-[#e1e5e1] bg-[#f4f6f2]">
            <img
              src={value}
              alt={label}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
      {error && (
        <p role="alert" className="text-[11px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
