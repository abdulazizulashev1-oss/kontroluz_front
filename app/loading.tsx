import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      {/* Hero Skeleton */}
      <Skeleton className="w-full h-80 rounded-xl" />

      {/* Grid Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Skeleton className="h-64 rounded-lg" />
        <Skeleton className="h-64 rounded-lg" />
        <Skeleton className="h-64 rounded-lg" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
    </div>
  );
}
