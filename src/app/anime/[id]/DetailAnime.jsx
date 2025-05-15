import Image from "next/image";
import { PiStarFill } from "react-icons/pi";

const DetailAnime = ({ anime }) => {
  return (
    <div className="relative flex flex-col gap-6 py-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative w-full h-48 md:h-72 rounded overflow-hidden">
        <Image
          src={anime.bannerImage || anime.coverImage.large}
          alt="banner image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-6 z-20">
        {/* Left Sidebar */}
        <div className="md:w-1/3 lg:w-1/4 flex flex-col items-center">
          <Image
            src={anime.coverImage.large}
            alt="cover anime"
            width={200}
            height={300}
            className="rounded-lg shadow-lg mb-4 object-cover"
            priority
          />

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {anime.genres.map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-white"
                style={{ color: anime.coverImage.color || '#22c55e' }}
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="text-sm w-full space-y-2 p-4 rounded-lg ">
            {[
              ["Score", anime.meanScore / 10 || 0],
              ["Popularity", anime.popularity],
              ["Type", anime.type],
              ["Format", anime.format],
              ["Start", `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}`],
              ["End", `${anime.endDate.year}-${anime.endDate.month}-${anime.endDate.day}`],
              ["Season", `${anime.season} ${anime.seasonYear}`],
              ["Episodes", anime.episodes],
              ["Duration", anime.duration + ' min'],
              ["Tag", anime.hashtag],
            ].map(([label, value], i) => (
              <div key={i} className="flex justify-between">
                <span className="font-medium">{label}</span>
                <span>{value || "Unknown"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3 lg:w-3/4">
          <h1 className="text-2xl font-bold  mb-2">{anime.title.romaji}</h1>
          <p className="text-sm text-zinc-400 mb-4">
            {(anime.studios?.nodes || []).map((studio) => studio.name).join(", ")}
          </p>

          <div
            className="text-sm leading-relaxed max-h-96 overflow-y-auto prose prose-invert"
            dangerouslySetInnerHTML={{ __html: anime.description }}
          />
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-xl font-bold  mb-4">Top Reviews</h2>
        <div className="space-y-4">
          {anime.reviews?.nodes.map((review) => (
            <div key={review.id} className="bg-zinc-800 p-4 rounded-lg text-white">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={review.user.avatar.large}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{review.user.name}</span>
                <span className="flex items-center gap-1 ml-auto text-sm text-yellow-400">
                  <PiStarFill /> {review.rating}
                </span>
              </div>
              <p className="text-sm text-gray-300">{review.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetailAnime