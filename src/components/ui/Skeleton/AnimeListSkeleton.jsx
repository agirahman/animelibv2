import AnimeCardSkeleton from "./AnimeCardSkeleton";

const AnimeListSkeleton = ({ count = 10, title = true }) => {
    return (
        <div className="space-y-4">
            {/* Title Skeleton */}
            {title && (
                <div className="flex justify-between items-center mb-4">
                    <div className="h-8 w-48 animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                    <div className="h-6 w-20 animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                </div>
            )}

            {/* Grid Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {Array.from({ length: count }).map((_, i) => (
                    <AnimeCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
};

export default AnimeListSkeleton;
