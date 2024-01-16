/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.7.1.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as authors from "../authors.js";
import type * as categories from "../categories.js";
import type * as comments from "../comments.js";
import type * as http from "../http.js";
import type * as imageKit from "../imageKit.js";
import type * as likes from "../likes.js";
import type * as mailer from "../mailer.js";
import type * as openai from "../openai.js";
import type * as portfolios from "../portfolios.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  authors: typeof authors;
  categories: typeof categories;
  comments: typeof comments;
  http: typeof http;
  imageKit: typeof imageKit;
  likes: typeof likes;
  mailer: typeof mailer;
  openai: typeof openai;
  portfolios: typeof portfolios;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
