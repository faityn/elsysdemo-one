import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File) || file.type !== "image/webp") {
      return NextResponse.json(
        { error: "Зөвхөн WebP зураг upload хийнэ үү." },
        { status: 400 },
      );
    }

    if (file.size > 1_500_000) {
      return NextResponse.json(
        { error: "Зураг 1.5 МБ-аас бага байх ёстой." },
        { status: 400 },
      );
    }

    const uploadDirectory = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDirectory, { recursive: true });

    const filename = `${randomUUID()}.webp`;
    await writeFile(
      path.join(uploadDirectory, filename),
      Buffer.from(await file.arrayBuffer()),
    );

    return NextResponse.json({
      name: file.name || filename,
      url: `/uploads/${filename}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Зураг хадгалах үед алдаа гарлаа." },
      { status: 500 },
    );
  }
}
