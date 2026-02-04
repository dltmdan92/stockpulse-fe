# Tech Stack & Directory Structure

## Tech Stack (v0.1.0)

### Foundation

- **Framework**: Next.js 16.1.6 (App Router)
- **Library**: React 19.2.3
- **Language**: TypeScript 5+

### Styling & UI

- **Styling**: TailwindCSS 4 (PostCSS)
- **Icons**: Lucide React
- **Charts**: Recharts 3.7+
- **Font**: Geist Sans / Geist Mono

### State & Utilities

- **State Management**: Zustand 5+
- **Date Handling**: date-fns 4+
- **Utilities**: clsx (for conditional classes)

## Directory Structure

```
src/
├── app/                    # Next.js App Router (Pages & Layouts)
│   ├── layout.tsx          # Root Layout (Sidebar + Header + Font config)
│   ├── globals.css         # Global styles & Tailwind directives
│   ├── page.tsx           # Dashboard Page
│   ├── portfolio/         # /portfolio
│   ├── trades/            # /trades
│   ├── analysis/          # /analysis
│   ├── market/            # /market
│   ├── login/             # /login
│   └── register/          # /register
├── components/
│   ├── layout/            # Layout components (Header.tsx, Sidebar.tsx)
│   ├── dashboard/         # Dashboard specific (Charts, Cards)
│   └── ...                # Feature-specific components
├── lib/
│   ├── mockData.ts        # Mock data for initial development
│   └── utils.ts           # Shared utilities (cn, formatters)
├── store/
│   └── useStore.ts        # Global Zustand store
└── types/
    └── index.ts           # Shared TypeScript interfaces
```
