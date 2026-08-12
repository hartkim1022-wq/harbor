import { sqliteTable, text } from "drizzle-orm/sqlite-core";

/** Phase 2 stores the aggregate behind a repository boundary for a simple, atomic local workflow. */
export const harborState = sqliteTable("harbor_state", {
  id: text("id").primaryKey(),
  payload: text("payload").notNull(),
  updatedAt: text("updated_at").notNull(),
});
