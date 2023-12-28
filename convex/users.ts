import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v, Infer } from "convex/values";

/**
 * Convex validator to build the table. Used directly in the convex schema.
 */
export const UserValidator = v.object({
  name: v.string(),
  email: v.string(),
  nickname: v.optional(v.string()),
  gender: v.optional(v.string()),
  pictureUrl: v.optional(v.string()),
  phoneNumber: v.optional(v.string()),
  profileUrl: v.optional(v.string()),
  timezone: v.optional(v.string()),
  emailVerified: v.optional(v.boolean()),
  givenName: v.optional(v.string()),
  familyName: v.optional(v.string()),
  birthday: v.optional(v.string()),
  language: v.optional(v.string()),
  preferredUsername: v.optional(v.string()),
  tokenIdentifier: v.string(),
});

/**
 * TS inferred type
 */
export type Project = Infer<typeof UserValidator>;

/**
 * Find a single user profile with a given id.
 * @param {string?} userId
 */
export const find = query({
  args: { profileId: v.optional(v.string()) },
  handler: async (ctx, { profileId }) => {
    // if omitted or if it does not exist in the users table
    if (!profileId || !ctx.db.normalizeId("users", profileId)) return null;

    return await ctx.db.get(profileId as Id<"users">);
  },
});

/**
 * Insert or update the user in a Convex table then return the document's ID.
 *
 * The `UserIdentity.tokenIdentifier` string is a stable and unique value we use
 * to look up identities.
 *
 * Keep in mind that `UserIdentity` has a number of optional fields, the
 * presence of which depends on the identity provider chosen. It's up to the
 * application developer to determine which ones are available and to decide
 * which of those need to be persisted. For Clerk the fields are determined
 * by the JWT token's Claims config.
 *
 * This is used by the useStoreUserEffect hook and should not be called otherwise.
 */
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    const {
      name,
      email,
      subject,
      issuer,
      updatedAt,
      phoneNumberVerified,
      tokenIdentifier,
      ...restOfUser
    } = identity;

    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, {
          name: identity.name,
          email: identity.email,
          ...restOfUser,
        });
      }
      return user._id;
    }

    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name: identity.name!,
      email: identity.email!,
      tokenIdentifier,
      ...restOfUser,
    });
  },
});
