import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", {
    length: 255,
  }).notNull(),

  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),

  password: text("password").notNull(),

  mobile: varchar("mobile", {
    length: 15,
  }).notNull(),

  otp: varchar("otp", {
    length: 6,
  }),

  otpCreatedAt: timestamp("otp_created_at"),
});