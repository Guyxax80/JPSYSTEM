import { NextRequest } from "next/server";
import { readConfig, writeConfig } from "@/lib/storage";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jpsystem2026";
const CONFIG_KEY = "text-overrides.json";

/** GET — read overrides (public, no auth) */
export async function GET() {
  const overrides = await readConfig<Record<string, Record<string, string>>>(CONFIG_KEY, {});
  return Response.json({ overrides });
}

/** POST — write overrides (requires auth) */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.password !== ADMIN_PASSWORD) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (body.action === "read") {
      const overrides = await readConfig<Record<string, Record<string, string>>>(CONFIG_KEY, {});
      return Response.json({ overrides });
    }

    if (body.action === "write" && body.overrides) {
      await writeConfig(CONFIG_KEY, body.overrides);
      return Response.json({ success: true });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Text overrides error:", error);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
