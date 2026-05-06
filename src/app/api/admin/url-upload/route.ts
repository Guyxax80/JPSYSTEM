import { NextRequest } from "next/server";
import { readConfig, writeConfig, uploadFile } from "@/lib/storage";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jpsystem2026";
const CONFIG_KEY = "image-overrides.json";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.password !== ADMIN_PASSWORD) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url, targetName } = body;

    if (!url || !targetName) {
      return Response.json({ error: "Missing url or targetName" }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Admin Image Downloader)" },
    });

    if (!response.ok) {
      return Response.json({ error: `Download failed: HTTP ${response.status}` }, { status: 400 });
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      return Response.json({ error: "URL does not point to an image" }, { status: 400 });
    }

    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength > 10 * 1024 * 1024) {
      return Response.json({ error: "Image too large (max 10MB)" }, { status: 400 });
    }

    const blobUrl = await uploadFile(`images/${targetName}`, arrayBuffer, contentType);

    const overrides = await readConfig<Record<string, string>>(CONFIG_KEY, {});
    overrides[targetName] = blobUrl;
    await writeConfig(CONFIG_KEY, overrides);

    return Response.json({ success: true, fileName: targetName, url: blobUrl, size: arrayBuffer.byteLength });
  } catch (error) {
    console.error("URL upload error:", error);
    return Response.json({ error: "Failed to download image from URL" }, { status: 500 });
  }
}
