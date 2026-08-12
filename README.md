<p align="center"><img src="./assets/aura-banner.svg" alt="A stay worth remembering" width="100%" /></p>
<p align="center"><a href="https://sikder-three.vercel.app">Live site</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="https://github.com/Shoislam0311/Sikder">Source</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="docs/TECH_STACK.md">Stack notes</a></p>

> A hospitality interface shaped around arrival, discovery, and reservation.

## The property, translated to screen

Sikder Villa & Resort is a modern digital front door for a real hospitality brand in Kuakata, Bangladesh. The experience gives rooms, dining, events, wellness, gallery, contact, and reservation flows a consistent visual home.

## The guest journey

```text
Discover  →  Explore rooms  →  Feel the place  →  Reserve  →  Arrive
```

The interface is organized to keep that journey legible: editorial sections for atmosphere, structured content for decisions, and focused interactions where an action matters.

## Stack signal

`Next.js 16` · `React 19` · `TypeScript` · `Tailwind CSS 4` · `Radix UI` · `Prisma` · `SQLite` · `NextAuth` · `next-intl` · `Zustand` · `Bun`

## Run it locally

```bash
bun install
bun run db:generate
bun run dev
```

Before production:

```bash
bun run lint
bun run build
bun run start
```

Database workflows are available through `bun run db:push`, `bun run db:migrate`, and `bun run db:reset`. Review the schema before destructive commands.

## Where things live

The Next.js application is under `src/app`. Resort sections live in `src/components/site`, reusable primitives in `src/components/ui`, and shared state, utilities, and database access in `src/lib`.

<p align="center"><sub>Hospitality, translated into a calmer digital experience.</sub></p>
