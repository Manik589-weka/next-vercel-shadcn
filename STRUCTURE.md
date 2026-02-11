# WEKA-SANITY-NEXTJS – Folder Structure

```
src/
├── app/                    # Next.js App Router (routes, layouts, loading, error)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css
│   └── (routes)/           # Add route groups and pages here
│
├── components/
│   ├── ui/                 # Reusable UI primitives (Button, Card, Input, etc.)
│   └── layout/             # Header, Footer, Sidebar, etc.
│
├── lib/                    # Utilities, config, shared logic
│   ├── utils.ts            # cn() and helpers
│   └── constants.ts        # App constants, site config
│
├── hooks/                  # Custom React hooks
├── types/                  # Shared TypeScript types (e.g. Sanity schemas)
└── services/               # API clients, Sanity client, external services
```

- **Import alias:** `@/` → `src/` (e.g. `import { Header } from '@/components/layout'`).
- **Sanity:** Add schema and client under `lib/` or `services/` when you integrate.
