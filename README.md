<div align="center">

<img src="./public/logo.svg" width="96" alt="Sikder Resort & Villas logo" />

# Sikder Resort & Villas

A hospitality website for a resort in Kuakata, Patuakhali.

<a href="https://sikder-three.vercel.app/">Open the live site</a>
&nbsp; · &nbsp;
<a href="https://github.com/Shoislam0311/Sikder">Source</a>
&nbsp; · &nbsp;
<a href="docs/TECH_STACK.md">Stack notes</a>

</div>

---

## What this project is

Sikder Resort & Villas is a digital front door for a real resort opposite Eco Park in Kuakata. The site brings the parts a guest actually needs into one place: rooms, dining, events, wellness, gallery, contact, and reservations.

The design follows the journey of a stay rather than treating every page as a separate feature:

`discover` → `look around` → `choose a room` → `make a plan` → `reserve`

The resort data and imagery in the project are sourced from [sikderresort.com](https://sikderresort.com/). The application keeps that content in structured data so the pages, navigation, and sections stay consistent.

## Live site

<a href="https://sikder-three.vercel.app/"><img src="https://img.shields.io/badge/OPEN%20SIKDER%20LIVE-Visit%20the%20site-8B5CF6?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Open Sikder live site" /></a>

The live experience is the best place to see the current layout, room presentation, gallery, and reservation flow.

## Content on the site

| Section | Purpose |
|:--|:--|
| Rooms | Show room types, capacity, descriptions, and pricing information. |
| Dining | Present the restaurant and juice bar, including the available cuisines. |
| Wellness | Give the resort's wellness offering its own space instead of hiding it in a menu. |
| Events | Explain the event and venue options for guests and groups. |
| Gallery | Use the resort's own photography to show the place before a visit. |
| Kuakata | Connect the property to its location, nearby attractions, and the beach. |
| Reservations | Give visitors a clear route from interest to enquiry. |

## Stack

`Next.js 16` · `React 19` · `TypeScript` · `Tailwind CSS 4` · `Radix UI` · `Prisma` · `SQLite` · `NextAuth` · `next-intl` · `Zustand` · `Bun`

The application lives under `src/app`. Resort sections are in `src/components/site`, reusable primitives are in `src/components/ui`, and shared state, utilities, database access, and validation are under `src/lib`.

## Run locally

```bash
bun install
bun run db:generate
bun run dev
```

For a production check:

```bash
bun run lint
bun run build
bun run start
```

Database commands are available through `bun run db:push`, `bun run db:migrate`, and `bun run db:reset`. Review the schema before using a destructive command.

## Contributing

Before changing the site, read [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/TECH_STACK.md](docs/TECH_STACK.md). When changing content or imagery, keep the source and structure of the resort data clear. When changing the reservation or database flow, test the affected path rather than relying only on the homepage.

<div align="center"><sub>Sikder Resort & Villas · Kuakata, Patuakhali</sub></div>
