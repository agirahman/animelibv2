import AnimeCard from "@/components/AnimeList/AnimeCard";
import { PiStarFill } from "react-icons/pi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { getAllAnimePopular } from "@/utils/libs/getAllAnimePopular";
import React from "react";



const page = async () => {
  const dataAllAnimePopular = await getAllAnimePopular();

  return (
    <div className="min-h-screen pb-12">
      <div className="relative mb-12 mt-6 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 shadow-sm">
        <div className="absolute top-0 right-0 -m-8 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -m-8 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-500/10 rounded-xl">
              <MdOutlineLeaderboard className="text-yellow-500" size={32} />
            </div>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold rounded-full uppercase tracking-wider">
              Top Rated
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-zinc-900 dark:text-white">
            Anime <span className="text-yellow-500">Hall of Fame</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            The best of the best. Explore the top-rated anime series as voted by the community. Legendaries that you must watch.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {dataAllAnimePopular.length > 0 ? (
          dataAllAnimePopular.map((anime, index) => (
            <div key={anime.id} className="relative">
              {/* <div className="absolute -top-2 -left-2 z-20 w-8 h-8 flex items-center justify-center bg-yellow-500 text-black font-bold text-xs rounded-lg shadow-lg">
                #{index + 1}
              </div> */}
              <AnimeCard
                anime={anime}
                index={index}
                icon={<PiStarFill className="text-yellow-400" />}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="p-6 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-4">
              <MdOutlineLeaderboard className="text-zinc-400" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">No top anime found</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
              Check back later for updated rankings!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
