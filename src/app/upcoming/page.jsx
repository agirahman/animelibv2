import { FcLike } from "react-icons/fc";
import { MdOutlineUpcoming } from "react-icons/md";
import React from "react";
import { getAllAnimeUpcoming } from "@/utils/libs/getAllAnimeUpcoming";
import { fetchUpcomingAction } from "@/utils/actions/animeActions";
import InfiniteScrollList from "@/components/AnimeList/InfiniteScrollList";

const page = async () => {
  const { anime, pageInfo } = await getAllAnimeUpcoming(1, 18);

  return (
    <div className="min-h-screen pb-12">
      <div className="relative mb-6 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 shadow-sm">
        <div className="absolute top-0 right-0 -m-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -m-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <MdOutlineUpcoming className="text-purple-500" size={32} />
            </div>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-500 text-xs font-bold rounded-full uppercase tracking-wider">
              Anticipated
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-zinc-900 dark:text-white">
            Upcoming <span className="text-purple-500">Hits</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Get ready for the next wave of amazing stories. Discover the most anticipated anime coming soon to your screens.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        {anime.length > 0 ? (
          <InfiniteScrollList
            initialData={anime}
            initialPageInfo={pageInfo}
            fetchAction={fetchUpcomingAction}
            icon={<FcLike />}
            startIndex={0}
          />
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="p-6 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-4">
              <MdOutlineUpcoming className="text-zinc-400" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">No upcoming anime found</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
              Stay tuned! New announcements are coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

