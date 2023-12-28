import { defineSchema, defineTable } from "convex/server";
import { UserValidator } from "./users";

/**
 * Convex schema. Use the validators defined within their respective files. See users.ts for an example.
 */
export default defineSchema({
  users: defineTable(UserValidator).index("by_token", ["tokenIdentifier"]),
});
