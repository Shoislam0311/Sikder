# Sikder Villa & Resort

Sikder Villa & Resort is a hospitality website for presenting rooms, dining, events, wellness facilities, gallery content, contact information, and a reservation flow in a polished responsive interface.

## Technology Stack

| Layer | Technology | Evidence in repository |
|---|---|---|
| Framework | Next.js 16 with React 19 and TypeScript | `package.json`, `src/app/`, `tsconfig.json` |
| Styling | Tailwind CSS 4 with PostCSS and animation utilities | `tailwind.config.ts`, `postcss.config.mjs` |
| UI primitives | Radix UI, class-variance-authority, `lucide-react` | `src/components/ui/`, `package.json` |
| State and forms | Zustand, React Hook Form, Zod | `package.json`, `src/lib/` |
| Data layer | Prisma ORM with SQLite database asset | `prisma/schema.prisma`, `db/custom.db` |
| Content and interaction | MDX Editor, React Markdown, Framer Motion, Recharts | `package.json` |
| Authentication and localization | NextAuth and next-intl | `package.json` |
| Production runtime | Bun standalone server | `package.json` scripts, `bun.lock` |

## Local Development

Install dependencies with Bun, generate the Prisma client, and start the development server:

```bash
bun install
bun run db:generate
bun run dev
```

Useful project commands include:

```bash
bun run lint
bun run build
bun run start
```

Database workflows are available through `bun run db:push`, `bun run db:migrate`, and `bun run db:reset`. Review the schema and local data implications before running destructive commands.

## Project Structure

The Next.js application is organized under `src/app`. Resort-specific sections are in `src/components/site`, reusable interface primitives are in `src/components/ui`, and shared state, utilities, and database access are grouped under `src/lib`.

## Operational Notes

The production build creates a standalone Next.js output and copies static assets into it. Verification scripts are provided under `scripts/`; run the relevant checks when changing booking, visual, or deployment behavior.
