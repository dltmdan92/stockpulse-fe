# Coding Conventions

## 1. General Principles

- **Clarity over Brevity**: Write readable code. Variable names should be descriptive.
- **Consistency**: Follow existing patterns in the codebase.
- **Type Safety**: Strictly define interfaces in `src/types/index.ts`. Avoid `any`.

## 2. Component Structure

- **Function Components**: Use `export default function ComponentName() {}`.
- **Props Interface**: Define `interface ComponentNameProps` right above the component.
- **No Index Exports**: Avoid `index.ts` in component folders unless necessary for clean imports.

```tsx
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

## 3. Styling (TailwindCSS)

- **Utility First**: Use utility classes for almost everything.
- **Conditional Classes**: Use `cn()` helper from `@/lib/utils`.
- **CSS Variables**: Use defined CSS variables for colors (e.g., `text-[var(--text-muted)]` or extended tailwind config if available).
- **Responsive Design**: Mobile-first approach not strictly enforced yet, but layout should be responsive.
- **Layout Constraints**: Max-width `max-w-7xl mx-auto` for main page content.

## 4. State Management (Zustand)

- **Global Store**: Use `src/store/useStore.ts`.
- **Selectors**: Select specific state slices to minimalize re-renders.

```tsx
const { stocks } = useStore(); // Simple usage
```

## 5. File Naming

- **Components**: PascalCase (e.g., `StockCard.tsx`)
- **Utilities/Hooks**: camelCase (e.g., `useStore.ts`, `mockData.ts`)
- **Pages**: `page.tsx`, `layout.tsx` (Next.js standard)

## 6. Git Commit Convention

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructuring
- `docs`: Documentation changes
- `chore`: Build/Config updates
