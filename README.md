# What is this

This is a React template that uses the following technologies:

- React
- Typescript
- Vite, for bundler
- SWR, for data fetching
- Convex, for BaaS
- Clerk, for AaaS
- React-Router-Dom
- Tailwind

# Setting up

1. Run `npm i`
2. Optional: `cp .env.example .env.local`. Alternatively convex will create it for you, skip to the next step.
3. Run `npx convex dev`, to hook into convex dev environment. Select the add new project option.
4. Add your publishable key to .env.local. You get this when you add a new app to your dashboard at clerk.com.

# Basics

## Adding a new public page

Pages that are public and should not be required to log in via Clerk should be added to the router in routes/index as normal.

## Adding a new private page (requires basic auth)

Pages that need to require a user to be logged in should do the following.

1. Add a new page to the router in routes/index.
2. Use the <ProtectedPage /> component as the parent layout to enforce the user to be logged in. See the 'profile' path as an example.

Note: This only requires a user to be logged in via Clerk, however, further limitations should be easy to add.

## Add db persistence for users

1. Add a new JWT template to your app in Clerk. The template should be Convex.
2. Copy the issuer box from your JWT template in Clerk and add it to convex/auth.config.js as the domain.
3. Call the hook `useStoreUserEffect` within your routes/Layout file.

## SWR

SWR has been added for external data fetching, its configuration can be found in `config/swr`. By default this template sets refetch to 3000ms.
