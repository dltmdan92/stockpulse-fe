export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-40 bg-[var(--card)] rounded-lg shimmer" />
        <div className="h-4 w-60 bg-[var(--card)] rounded-lg shimmer" />
      </div>

      {/* Overview Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-[var(--card)] rounded-2xl border border-[var(--border)] shimmer" />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[400px] bg-[var(--card)] rounded-2xl border border-[var(--border)] shimmer" />
        <div className="h-[400px] bg-[var(--card)] rounded-2xl border border-[var(--border)] shimmer" />
      </div>

      {/* Table Skeleton */}
      <div className="h-[300px] bg-[var(--card)] rounded-2xl border border-[var(--border)] shimmer" />
    </div>
  );
}
