import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FcLike } from "react-icons/fc";
import { PiStarFill } from 'react-icons/pi';

const PopularList = ({ api }) => {
  return (
    <div className="flex flex-col gap-4">
      {api.data.map((anime, index) => (
        <Link key={index} href={`/anime/${anime.mal_id}`} className="flex ">
          <>
            <div className="hidden md:flex items-center justify-center w-15">
              <h1 className="text-3xl text-zinc-500 font-bold">#{anime.rank}</h1>
            </div>

            <div className="relative md:flex w-full max-h-29 bg-zinc-100 dark:bg-zinc-800 p-2 gap-1 rounded-md hover:shadow-lg dark:hover:bg-zinc-700 transition-all">
              <div className="absolute md:hidden top-0 start-0">
                <h1 className="text-sm text-black font-medium rounded-full bg-green-400 p-1">
                  #{anime.rank}
                </h1>
              </div>
              <div className="flex gap-1 w-full">
                <Image
                  src={anime.images.webp.image_url}
                  alt="anime cover"
                  width={350}
                  height={250}
                  priority
                  className="rounded-md group-hover:scale-102 transition-all  w-20 h-25 aspect-[11/16]"
                />

                <div className="flex items-center gap-2 w-full">
                  <div className="w-1/2">
                    <div className="md:w-full w-48 ">
                      <p className="font-semibold md:text-lg text- truncate">
                        {anime.title}
                      </p>
                      <div className="text-sm truncate">
                        {anime.genres.map((genre) => genre.name).join(" - ")}
                      </div>
                      <div className="block lg:hidden w-20">
                        <div className="flex items-center gap-1">
                          <FcLike />
                          <span className="">{anime.favorites}</span>
                        </div>
                        <div className=" flex items-center gap-1">
                          <div className="text-yellow-400">
                            <PiStarFill />
                          </div>
                          <span>{anime.score}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row w-1/2 ml-5 ">
                    <div className="hidden lg:block mr-4 w-18">
                      <div className="flex items-center gap-1">
                        <FcLike />
                        <span className="">{anime.favorites}</span>
                      </div>
                      <div className=" flex items-center gap-1">
                        <div className="text-yellow-400">
                          <PiStarFill />
                        </div>
                        <span>{anime.score}</span>
                      </div>
                    </div>
                    <div className=" mr-4 w-24">
                      <div className="flex items-center gap-1">
                        <h1 className="">{anime.type}</h1>
                      </div>
                      <div className=" flex items-center gap-1">
                        <h1>Episodes {anime.episodes}</h1>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h1 className="">{anime.status}</h1>
                      </div>
                      <div>
                        <h1>{anime.year}</h1>
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
