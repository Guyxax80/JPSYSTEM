import { NextRequest } from "next/server";
import { readConfig, writeConfig, uploadFile } from "@/lib/storage";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jpsystem2026";
const CONFIG_KEY = "image-overrides.json";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const password = formData.get("password") as string;

    if (password !== ADMIN_PASSWORD) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const file = formData.get("file") as File | null;
    const targetName = formData.get("targetName") as string;

    if (!file || !targetName) {
      return Response.json({ error: "Missing file or targetName" }, { status: 400 });
    }

    const url = await uploadFile(`images/${targetName}`, file, file.type);

    const overrides = await readConfig<Record<string, string>>(CONFIG_KEY, {});
    overrides[targetName] = url;
    await writeConfig(CONFIG_KEY, overrides);

    return Response.json({ success: true, fileName: targetName, url, size: file.size });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
