'use client'

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AiFillLike, AiOutlineGlobal } from "react-icons/ai";
import { PiStarFill, PiPlayCircleBold, PiMonitorBold } from "react-icons/pi";

const AnimeReviews = dynamic(() => import("./AnimeReviews"), {
  ssr: true,
  loading: () => <div className="h-32 w-full bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-xl" />
});

const DetailAnime = ({ anime }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  if (!anime) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-2xl font-bold mb-2">Anime Not Found</h2>
        <p className="text-zinc-500">We couldn't find the details for this anime titles.</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col pb-12">
      {/* Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        {(anime.bannerImage || anime.coverImage?.large) && (
          <Image
            src={anime.bannerImage || anime.coverImage.large}
            alt="banner image"
            fill
            className="object-cover brightness-50"
            priority
            fetchPriority="high"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent" />
      </div>

      {/* Content Container - Negative Margin for Overlap */}
      <div className="relative z-10 max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 -mt-32 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar (Cover & Info) */}
          <div className="md:w-1/3 lg:w-1/4 flex flex-col items-center md:items-start shrink-0">
            <div className="relative rounded-xl shadow-2xl overflow-hidden border-4 border-white dark:border-zinc-900 group bg-zinc-200 dark:bg-zinc-800">
              {anime.coverImage?.large && (
                <Image
                  src={anime.coverImage.large}
                  alt="cover anime"
                  width={240}
                  height={360}
                  className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-110"
                  loading="eager"
                />
              )}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 my-6 w-full">
              {(anime.genres || []).map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-gray-300 border border-zinc-300 dark:border-zinc-700"
                  style={{
                    color: anime.coverImage?.color || "#22c55e",
                  }}
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="w-full space-y-6">
              <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-5 shadow-sm space-y-3 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-bold text-lg mb-2 border-b border-zinc-300 dark:border-zinc-700 pb-2 text-zinc-900 dark:text-white">Information</h3>
                {[
                  ["Score", <span key="score" className="flex items-center gap-1 text-yellow-500"><PiStarFill /> {anime.meanScore ? anime.meanScore / 10 : "N/A"}</span>],
                  ["Popularity", anime.popularity?.toLocaleString() || "N/A"],
                  ["Type", anime.type || "N/A"],
                  ["Format", anime.format || "N/A"],
                  ["Status", `${anime.season || ""} ${anime.seasonYear || ""}`.trim() || "N/A"],
                  ["Episodes", anime.episodes || "?"],
                  ["Duration", anime.duration ? `${anime.duration} mins` : "?"],
                  ["Start Date", `${anime.startDate?.day || "?"}/${anime.startDate?.month || "?"}/${anime.startDate?.year || "?"}`],
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">{value}</span>
                  </div>
                ))}
              </div>

              {/* External Links */}
              {anime.externalLinks?.length > 0 && (
                <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-5 shadow-sm border border-zinc-200 dark:border-zinc-800">
                  <h3 className="font-bold text-lg mb-4 border-b border-zinc-300 dark:border-zinc-700 pb-2 text-zinc-900 dark:text-white">External Links</h3>
                  <div className="flex flex-col gap-2">
                    {anime.externalLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-700/50 group"
                      >
                        <div
                          className="w-8 h-8 rounded-md flex items-center justify-center text-white shrink-0 shadow-sm"
                          style={{ backgroundColor: link.color || "#4ade80" }}
                        >
                          {link.icon ? (
                            <Image
                              src={link.icon}
                              alt={`${link.site} icon`}
                              width={20}
                              height={20}
                              className="object-contain p-1"
                            />
                          ) : (
                            <AiOutlineGlobal className="text-lg" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white truncate">
                          {link.site}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content (Title, Desc, Reviews) */}
          <div className="md:w-2/3 lg:w-3/4 flex flex-col pt-4 md:pt-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 text-zinc-900 dark:text-white leading-tight">
              {anime.title?.romaji || anime.title?.english}
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-6 font-medium">
              {(anime.studios?.nodes || []).map((studio) => studio.name).join(", ")}
            </p>

            <div className="bg-white dark:bg-zinc-900/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2 text-zinc-900 dark:text-white">Synopsis</h3>
              <div
                className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 prose prose-zinc dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: anime.description || "No description available." }}
              />
            </div>

            {/* Trailer Section - Lite Implementation */}
            {anime.trailer?.id && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-zinc-900 dark:text-white">
                  <PiPlayCircleBold className="text-red-600" /> Video Trailer
                </h3>
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-black group/trailer">
                  {!showTrailer ? (
                    <div
                      className="absolute inset-0 cursor-pointer"
                      onClick={() => setShowTrailer(true)}
                    >
                      {anime.trailer.thumbnail ? (
                        <Image
                          src={anime.trailer.thumbnail}
                          alt="Trailer Thumbnail"
                          fill
                          className="object-cover opacity-60 group-hover/trailer:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-zinc-900" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-red-600 text-white p-5 rounded-full shadow-2xl transform group-hover/trailer:scale-110 transition-transform duration-300">
                          <PiPlayCircleBold size={40} />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium opacity-0 group-hover/trailer:opacity-100 transition-opacity">
                        Click to playing trailer
                      </div>
                    </div>
                  ) : (
                    <>
                      {anime.trailer.site?.toLowerCase() === "youtube" ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${anime.trailer.id}?autoplay=1`}
                          title="Anime Trailer"
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : anime.trailer.site?.toLowerCase() === "dailymotion" ? (
                        <iframe
                          src={`https://www.dailymotion.com/embed/video/${anime.trailer.id}?autoplay=1`}
                          title="Anime Trailer"
                          className="absolute inset-0 w-full h-full"
                          allow="autoplay"
                          allowFullScreen
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-zinc-500 italic">
                          Trailer available on {anime.trailer.site}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Streaming Episodes Section - Horizontal Slider */}
            {anime.streamingEpisodes?.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
                    <PiMonitorBold className="text-green-500" /> Watch Online
                  </h3>
                  <div className="hidden sm:flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-widest">
                    <span>Swipe to explore</span>
                    <div className="w-8 h-px bg-zinc-800" />
                    <span>{anime.streamingEpisodes.length} Episodes</span>
                  </div>
                </div>

                <div className="relative group/slider">
                  <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-hide no-scrollbar -mx-1 px-1 sm:mx-0 sm:px-0">
                    {anime.streamingEpisodes.map((episode, idx) => (
                      <a
                        key={idx}
                        href={episode.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-[260px] sm:w-[320px] snap-start group relative flex flex-col gap-3"
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
                          {episode.thumbnail ? (
                            <Image
                              src={episode.thumbnail}
                              alt={episode.title}
                              fill
                              loading="lazy"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 260px, 320px"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-zinc-400">
                              <PiPlayCircleBold size={40} className="opacity-20" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                              <PiPlayCircleBold size={24} />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider">
                            {episode.site}
                          </div>
                        </div>
                        <div className="px-1">
                          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-green-500 transition-colors">
                            {episode.title}
                          </h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
                            Official Streaming
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Gradient Masks for Slider */}
                  <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none opacity-0 sm:group-hover/slider:opacity-100 transition-opacity" />
                  <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none opacity-0 sm:group-hover/slider:opacity-100 transition-opacity" />
                </div>
              </div>
            )}


            {/* Reviews Section - Dynamic Import */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-zinc-900 dark:text-white">
                User Reviews <span className="text-sm font-normal text-zinc-500">({anime.reviews?.nodes?.length || 0})</span>
              </h2>
              <AnimeReviews reviews={anime.reviews} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAnime;