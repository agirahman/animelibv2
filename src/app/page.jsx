import { Suspense } from "react";
import dynamic from "next/dynamic";
import AnimeListSkeleton from "@/components/Skeleton/AnimeListSkeleton";

// Dynamic imports for TBT optimization
const AnimeRecommendationsSlider = dynamic(() => import("@/components/RecommendationAnime/RecommendationAnime"), {
  ssr: true,
  loading: () => <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-3xl shadow-xl" />
});

const PopularAnime = dynamic(() => import("@/components/Popular/PopularAnime"), {
  ssr: true,
  loading: () => <AnimeListSkeleton count={6} />
});

const OngoingAnime = dynamic(() => import("@/components/Ongoing/OngoingAnime"), {
  ssr: true,
  loading: () => <AnimeListSkeleton count={6} />
});

const UpcomingAnime = dynamic(() => import("@/components/Upcoming/UpcomingAnime"), {
  ssr: true,
  loading: () => <AnimeListSkeleton count={6} />
});


const HomePage = async () => {
  return (
    <div className="min-h-screen pb-12 overflow-x-hidden">
      {/* Hero Section */}
      <section className=" max-w-7xl mx-auto px-1 sm:px-4 lg:px-6">
        <AnimeRecommendationsSlider />
      </section>

      <div className="max-w-7xl mx-auto px-1 sm:px-4 lg:px-6 flex flex-col gap-4 mt-4">
        {/* Now Airing Section */}
        <Suspense fallback={<AnimeListSkeleton count={6} />}>
          <OngoingAnime />
        </Suspense>

        {/* Upcoming Section */}
        <Suspense fallback={<AnimeListSkeleton count={6} />}>
          <UpcomingAnime />
        </Suspense>

        {/* Top Anime Section */}
        <PopularAnime />
      </div>
    </div>
  );
};

export default HomePage;

