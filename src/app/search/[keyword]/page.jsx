import AnimeCard from "@/components/AnimeList/AnimeCard";
import { PiStarFill } from "react-icons/pi";
import { MdOutlineSearchOff } from "react-icons/md";

const SearchPage = async ({ params }) => {
  const { keyword } = await params;

  const query = `
    query ($search: String) {
      Page(perPage: 50) {
        media(search: $search, type: ANIME, isAdult: false, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large, color
          }
          meanScore
          format
        }
      }
    }
  `;

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { search: keyword },
    }),
  });

  const data = await response.json();
  const api = data.data.Page.media;

  // Keyword formatting (opsional)
  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const decodeKeyword = decodeURIComponent(keyword);
  const camelCaseKeyword = toCamelCase(decodeKeyword);

  return (
    <>
      <h1 className="sm:text-xl text-lg flex justify-center mb-4 font-semibold">
        Result For {camelCaseKeyword}
      </h1>
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

export default SearchPage;
