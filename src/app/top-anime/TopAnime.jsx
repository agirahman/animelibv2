import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiStarFill } from "react-icons/pi";

const TopAnime = ({ api }) => {
  return (
    <>
      <Header title="Top Anime" />
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 sm:gap-8 gap-4">
        {api.length > 0 ? (
          api.map((anime, index) => {
            return (
              <Link key={anime.id} href={`#`} className="group">
                <div className="relative">
                  <div className="absolute z-1 top-0 rounded-tl text-black text-sm font-medium rounded-br hover:scale-102 px-1 bg-green-400">
                    <span>#{index + 1}</span>
                  </div>
                  <Image
                    src={anime.coverImage.large}
                    alt="anime cover"
                    width={350}
                    height={250}
                    className="rounded group-hover:scale-102 transition-all w-full max-h-72 aspect-[11/16] object-cover group-hover:shadow-lg"
                  />
                </div>
                <h1 className="font-medium sm:text-md md:text-md text-sm mt-1 group-hover:text-green-400 transition-all truncate">
                  {anime.title.romaji || anime.title.english}
                </h1>
                <div className="flex text-sm items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="text-yellow-400">
                      <PiStarFill />
                    </div>
                    <span className="text-gray-500">{anime.averageScore}</span>
                  </div>
                  <span className="text-gray-500 truncate">{anime.format}</span>
                </div>
              </Link>
            );
          })
        ) : (
          <p>tidak ada data</p>
        )}
      </div>
    </>
  );
};

export default TopAnime;
