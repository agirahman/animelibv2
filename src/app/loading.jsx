import AnimeListSkeleton from "@/components/ui/Skeleton/AnimeListSkeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
      {/* Hero Skeleton Placeholder */}
      <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-3xl shadow-xl" />

      {/* List Skeletons */}
      <div className="flex flex-col gap-12 mt-8">
        <AnimeListSkeleton count={6} />
        <AnimeListSkeleton count={6} />
      </div>
    </div>
  );
}
