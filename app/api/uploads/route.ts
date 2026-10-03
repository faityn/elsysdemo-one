import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const accessToken = request.headers
    .get("authorization")
    ?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!accessToken) {
    return NextResponse.json(
      { error: "Нэвтрэх шаардлагатай." },
      { status: 401 },
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
    return NextResponse.json(
      { error: "Supabase тохиргоо дутуу байна." },
      { status: 500 },
    );
  }

  const supabase = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) {
    return NextResponse.json(
      { error: "Нэвтрэх эрх хүчингүй." },
      { status: 401 },
    );
  }
  if (data.user.app_metadata?.role !== "admin") {
    return NextResponse.json(
      { error: "Админ эрх шаардлагатай." },
      { status: 403 },
    );
  }

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
