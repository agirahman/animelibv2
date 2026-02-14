"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard from "./AnimeCard";
import AnimeCardSkeleton from "../Skeleton/AnimeCardSkeleton";

const InfiniteScrollList = ({
    initialData,
    initialPageInfo,
    fetchAction,
    actionParams = [],
    icon,
    startIndex = 20
}) => {
    const [animeList, setAnimeList] = useState(initialData);
    const [page, setPage] = useState(initialPageInfo?.currentPage || 1);
    const [hasNextPage, setHasNextPage] = useState(initialPageInfo?.hasNextPage || false);
    const [isLoading, setIsLoading] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: "200px",
    });

    const loadMoreAnime = useCallback(async () => {
        if (isLoading || !hasNextPage) return;

        setIsLoading(true);
        const nextPage = page + 1;

        try {
            const response = await fetchAction(...actionParams, nextPage);

            // Extract anime data based on expected response structures
            const newAnime = response.anime || response.dataAnimeSearch || [];
            const newPageInfo = response.pageInfo || { hasNextPage: false };

            if (newAnime.length > 0) {
                setAnimeList((prev) => [...prev, ...newAnime]);
                setPage(nextPage);
                setHasNextPage(newPageInfo.hasNextPage);
            } else {
                setHasNextPage(false);
            }
        } catch (error) {
            console.error("Error loading more anime:", error);
            setHasNextPage(false);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, hasNextPage, page, fetchAction, actionParams]);

    useEffect(() => {
        if (inView && hasNextPage && !isLoading) {
            loadMoreAnime();
        }
    }, [inView, hasNextPage, isLoading, loadMoreAnime]);

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-8 content-visibility-auto">
                {animeList.map((anime, index) => (
                    <AnimeCard
                        key={`${anime.id}-${index}`}
                        anime={anime}
                        icon={icon}
                        index={startIndex + index}
                    />
                ))}

                {/* Skeleton Loading State */}
                {isLoading && (
                    <>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <AnimeCardSkeleton key={`skeleton-${i}`} />
                        ))}
                    </>
                )}
            </div>

            {/* Intersection Trigger */}
            {hasNextPage && (
                <div ref={ref} className="h-20 w-full flex items-center justify-center mt-8">
                    {!isLoading && <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />}
                </div>
            )}
        </>
    );
};

export default InfiniteScrollList;
