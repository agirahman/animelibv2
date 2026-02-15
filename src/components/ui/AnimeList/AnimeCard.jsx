"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const AnimeCard = ({ anime, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const animeColor = anime.coverImage.color || "#22c55e";

  return (
    <Link
      href={`/anime/${anime.id}`}
      className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
      style={{ "--anime-color": animeColor }}
    >
      {/* Rank Badge */}
      {typeof index !== "undefined" && (
        <div className="absolute top-0 left-0 z-20">
          <div
            className="flex items-center justify-center min-w-[32px] sm:min-w-[40px] px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-br-xl font-black text-white shadow-[2px_2px_10px_rgba(0,0,0,0.3)] text-[10px] sm:text-xs tracking-tighter transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-1 group-hover:-translate-y-1 border-b border-r border-white/10"
            style={{ backgroundColor: `${animeColor}dd` }}
          >
            <span className="drop-shadow-md">#{index + 1}</span>
          </div>
        </div>
      )}

      {/* Format Badge (Top Right) */}
      <div className="absolute top-0 right-0 z-20">
        <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-bl-lg text-[8px] sm:text-[10px] font-bold text-white uppercase tracking-widest shadow-md">
          {anime.format}
        </div>
      </div>

      {/* Image Container */}
      <div className={`relative w-full aspect-[2/3] overflow-hidden bg-zinc-200 dark:bg-zinc-800 ${isLoading ? "animate-pulse" : ""}`}>
        <Image
          src={anime.coverImage.large}
          alt={anime.title.romaji || "Anime Cover"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onLoad={() => setIsLoading(false)}
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
      <div className="absolute bottom-0 left-0 w-full p-2 sm:p-3 bg-gradient-to-t from-black/90 to-transparent pt-10">
        <h3
          className="font-bold line-clamp-2 leading-tight transition-colors text-white group-hover:text-[var(--anime-color)] text-[10px] xs:text-xs sm:text-sm md:text-base"
        >
          {anime.title.romaji || anime.title.english}
        </h3>
      </div>
    </Link>
  );
};

export default AnimeCard;
