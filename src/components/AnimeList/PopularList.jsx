import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FcLike } from "react-icons/fc";
import { PiStarFill } from "react-icons/pi";

const PopularList = ({ api }) => {
  return (
    <div className="flex flex-col gap-4">
      {api.map((anime, index) => (
        <Link key={anime.id} href={`#`} className="flex">
          <>
            <div className="hidden md:flex items-center justify-center w-15">
              <h1 className="text-3xl text-zinc-500 font-bold">#{index + 1}</h1>
            </div>

            <div className="relative md:flex w-full max-h-29 bg-zinc-100 dark:bg-zinc-800 p-2 gap-1 rounded-md hover:shadow-lg dark:hover:bg-zinc-700 transition-all">
              <div className="absolute md:hidden top-0 start-0">
                <h1 className="text-sm text-black font-medium rounded-full bg-green-400 p-1">
                  #{index + 1}
                </h1>
              </div>

              <div className="flex gap-1 w-full">
                <Image
                  src={anime.coverImage.large}
                  alt="anime cover"
                  width={350}
                  height={250}
                  priority
                  className="rounded-md group-hover:scale-102 transition-all w-20 h-25 aspect-[11/16]"
                />

                <div className="flex items-center gap-2 w-full">
                  <div className="w-1/2">
                    <div className="md:w-full w-48">
                      <p className="font-semibold md:text-lg text- truncate">
                        {anime.title.romaji || anime.title.english}
                      </p>
                      <div className="text-sm truncate">
                        {(anime.genres || []).join(" - ")}
                      </div>
                      <div className="block lg:hidden w-20">
                        <div className="flex items-center gap-1">
                          <div className="text-yellow-400">
                            <PiStarFill />
                          </div>
                          <span>{anime.meanScore / 10}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FcLike />
                          <span>{anime.popularity || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row w-1/2 ml-5">
                    <div className="hidden lg:block mr-4 w-18">
                      <div className="flex items-center gap-1">
                        <div className="text-yellow-400">
                          <PiStarFill />
                        </div>
                        <span>{anime.meanScore / 10}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FcLike />
                        <span>{anime.popularity || 0}</span>
                      </div>
                    </div>
                    <div className="mr-4 w-24">
                      <div className="flex items-center gap-1">
                        <h1>{anime.format}</h1>
                      </div>
                      <div className="flex items-center gap-1">
                        <h1>{anime.episodes || "?"} Eps</h1>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h1>{anime.status}</h1>
                      </div>
                      <div>
                        <h1>{anime.endDate?.year || "Unknown"}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Link>
      ))}
    </div>
  );
};

export default PopularList;
