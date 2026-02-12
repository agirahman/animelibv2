import Image from "next/image";
import { PiStarFill } from "react-icons/pi";

const DetailAnime = ({ anime }) => {
  return (
    <div className="relative flex flex-col pb-12">
      {/* Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src={anime.bannerImage || anime.coverImage.large}
          alt="banner image"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent" />
      </div>

      {/* Content Container - Negative Margin for Overlap */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar (Cover & Info) */}
          <div className="md:w-1/3 lg:w-1/4 flex flex-col items-center md:items-start shrink-0">
            <div className="relative rounded-xl shadow-2xl overflow-hidden border-4 border-white dark:border-zinc-900 group">
              <Image
                src={anime.coverImage.large}
                alt="cover anime"
                width={240}
                height={360}
                className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 my-6 w-full">
              {anime.genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-gray-300 border border-zinc-300 dark:border-zinc-700"
                  style={{
                    color: anime.coverImage.color || "#22c55e",
                  }}
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl p-5 shadow-sm space-y-3 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-lg mb-2 border-b border-zinc-300 dark:border-zinc-700 pb-2">Information</h3>
              {[
                ["Score", <span key="score" className="flex items-center gap-1 text-yellow-500"><PiStarFill /> {anime.meanScore / 10 || "N/A"}</span>],
                ["Popularity", anime.popularity?.toLocaleString() || "N/A"],
                ["Type", anime.type],
                ["Format", anime.format],
                ["Status", `${anime.season} ${anime.seasonYear || ""}`],
                ["Episodes", anime.episodes || "?"],
                ["Duration", `${anime.duration || "?"} mins`],
                ["Start Date", `${anime.startDate.day || "?"}/${anime.startDate.month || "?"}/${anime.startDate.year}`],
              ].map(([label, value], i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content (Title, Desc, Reviews) */}
          <div className="md:w-2/3 lg:w-3/4 flex flex-col pt-4 md:pt-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 text-zinc-900 dark:text-white leading-tight">
              {anime.title.romaji}
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-6 font-medium">
              {(anime.studios?.nodes || []).map((studio) => studio.name).join(", ")}
            </p>

            <div className="bg-white dark:bg-zinc-900/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-10">
              <h3 className="text-xl font-bold mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">Synopsis</h3>
              <div
                className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 prose prose-zinc dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: anime.description }}
              />
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                User Reviews <span className="text-sm font-normal text-zinc-500">({anime.reviews?.nodes.length || 0})</span>
              </h2>
              {anime.reviews?.nodes?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {anime.reviews.nodes.map((review) => (
                    <div key={review.id} className="bg-zinc-50 dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.user.avatar.large}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
                        />
                        <div>
                          <p className="font-bold text-sm text-zinc-900 dark:text-white">{review.user.name}</p>
                          <div className="flex items-center gap-1 text-xs text-yellow-500">
                            <PiStarFill />
                            <span>{review.rating / 10}/10</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-4 leading-relaxed italic">
                        "{review.summary}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 italic">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailAnime