import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  transportations: defineTable({
    price: v.float64(),
    status: v.float64(),
    storageId: v.string(),
    title: v.string(),
    unit: v.string(),
  }),
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
});

export default schema;
