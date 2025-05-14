import Image from "next/image";
import { FcLike } from "react-icons/fc";
import { PiStarFill } from "react-icons/pi";

const getAnimeById = async (id) => {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title { romaji, english }
        coverImage { large, color }
        studios (isMain: true) {
          nodes {
            name
          }
        }
        bannerImage
        genres
        description
        meanScore
        popularity
        type
        format
        startDate { year, month, day }
        endDate { year, month, day }
        season
        seasonYear
        episodes
        duration
        hashtag
        reviews(sort: RATING_DESC perPage: 25) {
      nodes {
        id
        summary
        rating
        user {
          name
          avatar {
            large
          }
        }
      }
    }
      }
    }
  `;

  const variables = { id: parseInt(id) };

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  return data.data.Media;
};

const page = async ({ params }) => {
  const anime = await getAnimeById(params.id);

  return (
    <>
      <div className="relative">
        <>
          <Image
            src={anime.bannerImage || anime.coverImage.large}
            alt="banner image"
            width={1920}
            height={600}
            className="rounded w-full max-h-48 aspect-[11/16] object-cover"
            priority
          />
        </>
        <>
          <div className="absolute flex gap-2 top-25 pl-2 w-full ">
            {/* Side Content */}
            <div className="w-48">
              <Image
                src={anime.coverImage.large}
                alt={"cover anime"}
                width={150}
                height={150}
                className="rounded top-20 left-4 w-40  max-h-72 aspect-[11/16] object-cover shadow-lg"
                priority
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {(anime.genres || []).map((genre, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded text-xs font-semibold bg-zinc-700"
                    style={{ color: anime.coverImage.color || "22c55e" }}
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-sm  flex flex-col gap-2 overflow-x-scroll ">
                <div className="flex items-center font-semibold gap-1">
                  <PiStarFill className="text-yellow-400" />
                  <p>{anime.meanScore / 10 || 0}</p>
                </div>
                <div className="flex items-center font-semibold gap-1">
                  <FcLike />
                  <p>{anime.popularity || 0}</p>
                </div>

                <div className="flex">
                  <p className="w-1/2">Type</p>
                  <p className="w-1/2">{anime.type || "Unknown"}</p>
                </div>
                <div className="flex">
                  <p className="w-1/2">Fromat</p>
                  <p className="w-1/2">{anime.format || "Unknown"}</p>
                </div>
                <div className="flex">
                  <p className="w-1/2">Start</p>
                  <p className="w-1/2">
                    {anime.startDate.year || "Unknown"} {anime.startDate.month}{" "}
                    {anime.startDate.day}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-1/2">End</p>
                  <p className="w-1/2">
                    {anime.endDate.year || "Unknown"} {anime.endDate.month}{" "}
                    {anime.endDate.day}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-1/2">Season</p>
                  <p className="w-1/2">
                    {anime.season || "Unknown"} {anime.seasonYear}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-1/2">Episodes</p>
                  <p className="w-1/2">{anime.episodes || "Unknown"}</p>
                </div>
                <div className="flex">
                  <p className="w-1/2">Duration</p>
                  <p className="w-1/2">{anime.duration || "Unknown"} </p>
                </div>
                <div className="flex">
                  <p className="w-1/2">Tag</p>
                  <p className="w-1/2">{anime.hashtag || "Unknown"}</p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="pt-23 w-full">
              <h1 className="font-bold text-lg">{anime.title.romaji}</h1>
              <p
                className="font-semibold "
                style={{ color: anime.coverImage.color }}
              >
                {(anime.studios?.nodes || [])
                  .map((studio) => studio.name)
                  .join(", ")}
              </p>

              <div
                className="text-sm font-medium text-justify max-h-105 lg:max-h-fit md:overflow-y-hidden overflow-y-scroll mt-4"
                dangerouslySetInnerHTML={{ __html: anime.description }}
              />
            </div>
          </div>
        </>

        {/* reviews */}
        <div className="mt-135">
          <h2 className="text-xl font-bold mb-2">Top Reviews</h2>
          {anime.reviews?.nodes.map((review) => (
            <div key={review.id} className="border rounded p-3 mb-3">
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={review.user.avatar.large}
                  alt="avatar"
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium">{review.user.name}</span>
                <span className="ml-auto text-sm text-gray-500">
                  ⭐ {review.rating}
                </span>
              </div>
              <p className="text-sm text-gray-300">{review.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
