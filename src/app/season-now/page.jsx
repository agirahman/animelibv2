import AnimeCard from "@/components/AnimeList/AnimeCard";
import Header from "@/components/Header";
import { PiStarFill } from "react-icons/pi";
import { fetchData } from "@/utils/services/api";

const queryNow = `
    query {
      Page(perPage: 50) {
        media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC) {
          id
          title { romaji english }
          coverImage { large, color }
          meanScore
          format
        }
      }
    }
  `;

const page = async () => {
  const api = await fetchData(queryNow);
  return (
    <>
      <Header title="Now Airing Anime" />
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 sm:gap-8 gap-4">
        {api.length > 0 ? (
          api.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              icon={<PiStarFill className="text-yellow-400" />}
            />
          ))
        ) : (
          <div className="text-2xl flex flex-col items-center justify-center font-semibold text-zinc-500">
            <MdOutlineSearchOff />
            <h1>No Result</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
