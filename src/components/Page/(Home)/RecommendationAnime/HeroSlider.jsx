"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaPlay, FaInfoCircle } from "react-icons/fa";

const HeroSlider = ({ recommendations }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Limit to top 5 recommendations for better performance (LCP/TBT)
    const slides = recommendations.slice(0, 5);

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    if (!slides || slides.length === 0) return null;

    return (
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden rounded-xl shadow-2xl group bg-zinc-900">
            {slides.map((anime, index) => (
                <div
                    key={`${anime.id}-${index}`}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={anime.bannerImage || anime.coverImage.extraLarge}
                            alt={anime.title.romaji}
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-5 sm:p-8 md:p-12 w-full md:w-2/3 lg:w-1/2 flex flex-col gap-3 sm:gap-4 text-white">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold line-clamp-2 leading-tight drop-shadow-lg">
                            {anime.title.romaji}
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base text-gray-200 line-clamp-2 sm:line-clamp-3 drop-shadow-md">
                            Experience the thrill of {anime.title.romaji}. Stream now and dive into a world of adventure!
                        </p>

                        <div className="flex gap-3 mt-1 sm:mt-2">
                            <Link
                                href={`/anime/${anime.id}`}
                                className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/30 text-xs sm:text-base"
                            >
                                <FaPlay size={12} className="sm:w-4 sm:h-4" /> Watch Now
                            </Link>
                            <Link
                                href={`/anime/${anime.id}`}
                                className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-full transition-all hover:scale-105 text-xs sm:text-base"
                            >
                                <FaInfoCircle size={14} className="sm:w-4 sm:h-4" /> Details
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-1.5 sm:bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-12 flex gap-1.5 sm:gap-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-6 sm:w-8 bg-green-500" : "w-1.5 sm:w-2 bg-white/50 hover:bg-white"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
