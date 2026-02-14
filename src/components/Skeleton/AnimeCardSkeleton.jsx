import Skeleton from "./index";

const AnimeCardSkeleton = () => {
    return (
        <div className="flex flex-col gap-3 group">
            {/* Image Skeleton */}
            <Skeleton className="aspect-[3/4] w-full rounded-xl" />

            {/* Text Skeletons */}
            <div className="space-y-2 px-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
    );
};

export default AnimeCardSkeleton;
