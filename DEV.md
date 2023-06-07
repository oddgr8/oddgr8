# What?

The aim of this project is to have a personal corner of the internet. I intend to add

- a landing page about me
- a blog page
- Some private pages:
  - a bucket list
  - Life goals/TODOs
  - Expense tracking
  - Brag document
- a place to host any small projects I make

It will be hosted on my [domain](https://onkardeshpande.com).

# Why?

Yeah... Not really sure about this.

# How?

This is a [Next.js](https://nextjs.org/) project. You might want to understand these libraries before contributing

- [TailwindCSS](https://tailwindcss.com/) for inline css utility classes. Might add other utility libraries like [clsx](https://github.com/lukeed/clsx).
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [tRPC](https://trpc.io/) for connecting to backend
- [T3env](https://env.t3.gg/) and [zod](https://zod.dev/) for handling environment variables. Zod can also be used for state management
- [Husky](https://typicode.github.io/husky/) for git hooks

Some libraries/frameworks to consider as more functionality is needed:

- [Jest](https://jestjs.io/) for testing APIs
- [Vercel](https://planetscale.com/) for hosting
- [Planetscale](https://planetscale.com/) for database hosting. Will probably use mySQL or Postgres
- [Drizzle ORM](https://orm.drizzle.team/) or [Prisma](https://www.prisma.io/) for ORM and database migrations

# Contributing

Maintain high-level tasks here. Remember to update the status and add notes if required. This is because there are often gaps when you don't contribute and this helps rebuild context.

### TODOs

- ✅ Add Husky hooks
- 💭 Add API test
- 💭 Add Authentication
- 💭 Add Layout
  - 💭 Add NavBar
  - 💭 Add Private pages
- 💭 Add Home page
  - 💭 Add Projects list
- 💭 Add Blog page
- 💭 Add private pages
  - 💭 Add database connection
  - 💭 Add expenses page
  - 💭 Add brag page
- 💭 Deploy

Legend:

- 💭 To do
- ⏳ In Progress
- 🚫 Blocked
- ✅ Done
