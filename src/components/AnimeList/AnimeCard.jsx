"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const AnimeCard = ({ anime, icon, index, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/anime/${anime.id}`}
      className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rank Badge */}
      {typeof index !== "undefined" && (
        <div className="absolute top-0 left-0 z-20">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-br-lg font-bold text-white shadow-md text-sm"
            style={{ backgroundColor: anime.coverImage.color || "#22c55e" }}
          >
            #{index + 1}
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        <Image
          src={anime.coverImage.large}
          alt={anime.title.romaji || "Anime Cover"}
          fill
          sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={priority}
        />

        {/* Hover Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Icon on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 to-transparent pt-8">
        <h3
          className="font-bold text-sm md:text-base line-clamp-2 leading-tight transition-colors"
          style={{
            color: isHovered ? anime.coverImage.color || "#22c55e" : "#ffffff",
          }}
        >
          {anime.title.romaji || anime.title.english}
        </h3>

        <div className="flex items-center justify-between mt-1 text-xs text-gray-300">
          <div className="flex items-center gap-1">
            {icon}
            <span>{anime.popularity || anime.meanScore / 10}</span>
          </div>
          <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] backdrop-blur-sm">
            {anime.format}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
