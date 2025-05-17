import { date, integer, numeric, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: varchar('amount').notNull(),
    icon: varchar('icon'),
    order: integer('order').default(0).notNull(),
    createdBy: varchar('created_by').notNull(),
})

export type BudgetType = typeof Budgets.$inferSelect;

export const Entries = pgTable('entries', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount').notNull(),
    budgetId: integer('budgetId').references(() => Budgets.id, { onDelete: 'cascade' }),
    createdAt: date({ mode: "date" }).defaultNow(),
    createdBy: varchar('created_by').notNull()
})


export type EntrieType = typeof Entries.$inferSelect;


const typeTransaction = pgEnum('type_transaction', ['income', 'expense'])

export const Transactions = pgTable('transactions', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    description: text(),
    category: varchar('category').notNull(),
    amount: varchar("amount").notNull(),
    type: typeTransaction(),
    date: timestamp({ mode: "date" }).notNull().defaultNow(),
    createdBy: varchar('created_by').notNull()
})


export type TransactionType = typeof Transactions.$inferSelect