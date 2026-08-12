import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { harborState } from "@/db/schema";
import { initialData } from "@/data/mock";
import type { HarborData } from "@/lib/types";

const STATE_ID = "personal-workspace";

export async function GET() {
  try {
    const db = getDb();
    const [row] = await db.select().from(harborState).where(eq(harborState.id, STATE_ID)).limit(1);
    if (row) return Response.json(JSON.parse(row.payload) as HarborData);
    await db.insert(harborState).values({ id: STATE_ID, payload: JSON.stringify(initialData), updatedAt: new Date().toISOString() });
    return Response.json(initialData);
  } catch {
    return Response.json(initialData, { headers: { "x-harbor-storage": "fixture-fallback" } });
  }
}

export async function PUT(request: Request) {
  try {
    const data = (await request.json()) as HarborData;
    if (!Array.isArray(data.accounts) || !Array.isArray(data.transactions)) return Response.json({ error: "Invalid Harbor data" }, { status: 400 });
    const db = getDb();
    const updatedAt = new Date().toISOString();
    await db.insert(harborState).values({ id: STATE_ID, payload: JSON.stringify(data), updatedAt }).onConflictDoUpdate({ target: harborState.id, set: { payload: JSON.stringify(data), updatedAt } });
    return Response.json(data);
  } catch {
    return Response.json({ error: "Harbor could not save your changes." }, { status: 500 });
  }
}
