/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as airplane_time from "../airplane_time.js";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as payments from "../payments.js";
import type * as support from "../support.js";
import type * as tasks from "../tasks.js";
import type * as transactions from "../transactions.js";
import type * as transportation from "../transportation.js";
import type * as user from "../user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  airplane_time: typeof airplane_time;
  auth: typeof auth;
  http: typeof http;
  payments: typeof payments;
  support: typeof support;
  tasks: typeof tasks;
  transactions: typeof transactions;
  transportation: typeof transportation;
  user: typeof user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
