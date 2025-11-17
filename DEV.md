# My Personal Corner of the Internet

## What

A small space I'm building for myself online, with both completed items and ongoing goals in one place.

### Public

- [x] Landing page
- [x] Blog page
  - [ ] Blog posts
- [x] My public keys
- [x] “Feeling lucky” link
- [ ] Projects section
  - [ ] Projects list
  - [ ] Small hosted projects

### Private

Migrate private pages from Notion/Sheets

- [x] Private API
- [ ] Bucket list
- [ ] Life goals / TODOs
- [ ] Expense tracking
- [ ] Brag document

### Backend / Infra

- [x] Authentication (NextAuth)
- [x] tRPC backend
- [x] API tests (Jest)
- [x] Husky git hooks
- [x] Deployment workflow (Vercel)
- [ ] Database
  - [ ] Connection
  - [ ] Schema + private pages (expenses, brag, etc.)

Hosted on my [domain](https://onkardeshpande.com).

## Why

Still figuring that out.

## How

Built with **Next.js** via `create-t3-app`.

Tools & services:

- [pnpm](https://pnpm.io/) – package manager
- [tailwindcss](https://tailwindcss.com/) – styling (might add utilities like `clsx`)
- [NextAuth.js](https://next-auth.js.org/) – auth
- [tRPC](https://trpc.io/) – backend bridge
- [T3env](https://env.t3.gg/) + [zod](https://zod.dev/) – env validation
- [biome](https://biomejs.dev/) – linting & formatting
- [Husky](https://typicode.github.io/husky/) – git hooks
- [Jest](https://jestjs.io/) – API tests
- [Vercel](https://vercel.com/) – hosting (main + staging workflow)

Potential additions later:

- [Planetscale](https://planetscale.com/) or [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Drizzle](https://orm.drizzle.team/) or [Prisma](https://www.prisma.io/)

Push to **staging** for preview; push to **main** for production.
