import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  transactions: defineTable({
    departure_date: v.string(),
    email: v.string(),
    from: v.string(),
    issued_date: v.string(),
    name: v.string(),
    order_ref: v.string(),
    passager: v.float64(),
    payment_method: v.string(),
    phone: v.string(),
    return_date: v.string(),
    special_request: v.string(),
    status: v.boolean(),
    ticket_type: v.string(),
    to: v.string(),
    total: v.float64(),
    trip: v.string(),
  }),
  airplane_time: defineTable({
    from_town: v.boolean(),
    time: v.string(),
  }),
  payments: defineTable({
    status: v.boolean(),
    title: v.string(),
    value: v.string(),
  }),
  support: defineTable({
    status: v.boolean(),
    storageId: v.id("_storage"),
    title: v.string(),
    value: v.string(),
  }),
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
  }),
  transportations: defineTable({
    price: v.float64(),
    status: v.float64(),
    storageId: v.string(),
    title: v.string(),
    unit: v.string(),
  }),
});

export default schema;
