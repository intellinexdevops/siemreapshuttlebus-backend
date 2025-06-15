import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const transportations = await ctx.db.query("transportations").collect();
    return Promise.all(
      transportations.map(async (transportation) => ({
        ...transportation,
        url: await ctx.storage.getUrl(transportation.storageId),
      }))
    );
  },
});

export const select = query({
  args: { id: v.id("transportations") },
  handler: async (ctx, args) => {
    const transportation = await ctx.db.get(args.id);
    if (!transportation) {
      return null;
    }
    const url = await ctx.storage.getUrl(transportation.storageId);
    return {
      ...transportation,
      url,
    };
  },
});

export const createTransportation = mutation({
  args: {
    title: v.string(),
    price: v.number(),
    status: v.number(),
    storageId: v.string(),
    capacity: v.string(),
    include: v.optional(v.array(v.string())),
    exclude: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { title, price, status, storageId, capacity, include, exclude } =
      args;

    return await ctx.db.insert("transportations", {
      title,
      price,
      status,
      storageId,
      unit: "day",
      capacity,
      exclude,
      include,
    });
  },
});

export const updateTransportation = mutation({
  args: {
    id: v.id("transportations"),
    title: v.optional(v.string()),
    capacity: v.optional(v.string()),
    price: v.optional(v.number()),
    include: v.optional(v.array(v.string())),
    exclude: v.optional(v.array(v.string())),
    status: v.optional(v.number()),
    storageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, title, capacity, price, include, status, exclude, storageId } =
      args;
    return await ctx.db.patch(id, {
      title: title,
      capacity: capacity,
      price: price,
      include: include,
      exclude: exclude,
      status: status,
      storageId: storageId,
    });
  },
});

export const deleteTransportation = mutation({
  args: { id: v.id("transportations") },
  handler: async (ctx, args) => {
    const { id } = args;
    return await ctx.db.delete(id);
  },
});
