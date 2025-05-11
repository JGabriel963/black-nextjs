import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: varchar('amount').notNull(),
    icon: varchar('icon'),
    order: integer('order').default(0).notNull(),
    createdBy: varchar('created_by').notNull(),
})

export type Budget = typeof Budgets.$inferSelect;