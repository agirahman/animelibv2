"use client";

import Image from "next/image";
import Link from "next/link";
import { PiStarFill } from "react-icons/pi";
import { MdFormatListBulleted, MdCalendarToday, MdOutlineUpdate } from "react-icons/md";
import { useState } from "react";

const TopAnimeItem = ({ anime, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const themeColor = anime.coverImage.color || "#eab308"; // Default to yellow-500

    return (
        <Link
            href={`/anime/${anime.id}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
            style={{
                borderColor: isHovered ? `${themeColor}80` : undefined,
                boxShadow: isHovered ? `0 20px 25px -5px ${themeColor}10, 0 8px 10px -6px ${themeColor}10` : undefined
            }}
        >
            <div className="flex flex-row gap-4 p-2.5 sm:p-4">
                {/* Rank and Image Container */}
                <div className="relative flex-shrink-0">
                    <div
                        className="absolute -top-1 -left-1 z-20 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-black font-black text-xs sm:text-lg rounded-lg sm:rounded-xl shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300"
                        style={{ backgroundColor: themeColor }}
                    >
                        #{index + 1}
                    </div>
                    <div className="relative w-28 sm:w-32 aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden shadow-md">
                        <Image
                            src={anime.coverImage.large}
                            alt={anime.title.romaji}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 112px, 128px"
                        />
                    </div>
                </div>

                {/* Info Content */}
                <div className="flex-grow flex flex-col justify-between py-0.5 sm:py-1">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-[10px] sm:text-xs">
                            <div
                                className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg border"
                                style={{
                                    backgroundColor: `${themeColor}10`,
                                    color: themeColor,
                                    borderColor: `${themeColor}20`
                                }}
                            >
                                <PiStarFill size={14} className="sm:w-4" />
                                <span className="font-bold tracking-tight">{anime.meanScore / 10}</span>
                            </div>
                            <span className="font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest bg-zinc-200/50 dark:bg-zinc-800/50 px-1.5 py-0.5 sm:px-2 rounded">
                                {anime.format}
                            </span>
                        </div>

                        <h3
                            className="text-base sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-1.5 sm:mb-3 line-clamp-2 transition-colors"
                            style={{ color: isHovered ? themeColor : undefined }}
                        >
                            {anime.title.romaji}
                        </h3>

                        <div className="flex flex-wrap gap-y-1 gap-x-3 sm:gap-x-4 text-[10px] sm:text-sm text-zinc-500 dark:text-zinc-400 mb-2 sm:mb-4">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <MdFormatListBulleted className="text-zinc-400" />
                                <span>{anime.episodes ? `${anime.episodes} Eps` : "Spec"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 border-l border-zinc-200 dark:border-zinc-800 pl-3 sm:pl-4">
                                <MdCalendarToday className="text-zinc-400" />
                                <span>{anime.startDate.year}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {anime.genres?.slice(0, 2).map((genre) => (
                                <span
                                    key={genre}
                                    className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border border-zinc-300/50 dark:border-zinc-700/50"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Action Indicator (Desktop Only) */}
                    <div className="hidden sm:flex items-center justify-end">
                        <span
                            className="text-xs font-bold uppercase tracking-widest transition-opacity"
                            style={{
                                color: themeColor,
                                opacity: isHovered ? 1 : 0
                            }}
                        >
                            View Detail &rarr;
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const TopAnimeList = ({ api }) => {
    return (
        <div className="flex flex-col gap-4">
            {api?.map((anime, index) => (
                <TopAnimeItem key={anime.id} anime={anime} index={index} />
            ))}
        </div>
    );
};

export default TopAnimeList;
