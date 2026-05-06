import { NextRequest } from "next/server";
import { readConfig } from "@/lib/storage";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jpsystem2026";
const CONFIG_KEY = "image-overrides.json";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.password !== ADMIN_PASSWORD) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const overrides = await readConfig<Record<string, string>>(CONFIG_KEY, {});
    return Response.json({ overrides });
  } catch (error) {
    console.error("List error:", error);
    return Response.json({ error: "Failed to list images" }, { status: 500 });
  }
}
