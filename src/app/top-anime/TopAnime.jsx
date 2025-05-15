"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TopAnime = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/anime/${anime.id}`}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute md:hidden top-0 start-0 z-10">
        <h1
          className="text-sm text-black font-medium rounded-full p-1"
          style={{ backgroundColor: anime.coverImage.color || "#22c55e" }}
        >
          #{}
        </h1>
      </div>
      ;
      <Image
        src={anime.coverImage.large}
        alt="anime cover"
        width={350}
        height={250}
        priority
        className="rounded group-hover:scale-102 transition-all  w-full max-h-72 aspect-[11/16] object-cover group-hover:shadow-lg"
      />
      <h1
        className="font-medium sm:text-md md:text-md text-sm mt-1 transition-all line-clamp-2 min-h-[2.7rem]"
        style={{
          color: isHovered ? anime.coverImage.color || "#22c55e" : "inherit",
        }}
      >
        {anime.title.romaji || anime.title.english}
      </h1>
      <div className="flex text-sm items-center justify-between">
        <div className="flex items-center gap-1">
          {icon}
          <span className="text-gray-500">
            {anime.popularity || anime.meanScore / 10}
          </span>
        </div>
        <span className="text-gray-500">{anime.format}</span>
      </div>
    </Link>
  );
};

export default TopAnime;
