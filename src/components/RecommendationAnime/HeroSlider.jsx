"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaPlay, FaInfoCircle } from "react-icons/fa";

const HeroSlider = ({ recommendations }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % recommendations.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [recommendations.length]);

    if (!recommendations || recommendations.length === 0) return null;

    return (
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden rounded-xl shadow-2xl group">
            {recommendations.map((anime, index) => (
                <div
                    key={`${anime.id}-${index}`}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={anime.bannerImage || anime.coverImage.large}
                            alt={anime.title.romaji}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4 text-white">
                        <h1 className="text-3xl md:text-5xl font-bold line-clamp-2 leading-tight drop-shadow-lg">
                            {anime.title.romaji}
                        </h1>
                        <p className="text-sm md:text-base text-gray-200 line-clamp-3 drop-shadow-md">
                            {/* Description is not available in recommendation query yet, using generic text or fetching if needed. 
                    For now, leaving placeholder or using formatted title/genres if available. 
                    Since description isn't in the provided query, I will omit it or add it to query later.
                */}
                            Experience the thrill of {anime.title.romaji}. Stream now and dive into a world of adventure!
                        </p>

                        <div className="flex gap-4 mt-2">
                            <Link
                                href={`/anime/${anime.id}`}
                                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/30"
                            >
                                <FaPlay size={16} /> Watch Now
                            </Link>
                            <Link
                                href={`/anime/${anime.id}`}
                                className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-full transition-all hover:scale-105"
                            >
                                <FaInfoCircle size={18} /> Details
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                {recommendations.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-green-500" : "w-2 bg-white/50 hover:bg-white"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
