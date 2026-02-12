import AnimeCard from "@/components/AnimeList/AnimeCard";
import { PiStarFill, PiSmileySad } from "react-icons/pi";
import Link from "next/link";

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
          popularity
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
  const api = data.data?.Page?.media || [];

  const decodeKeyword = decodeURIComponent(keyword);

  return (
    <div className="py-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh]">
      <div className="mb-8 text-center md:text-left border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 break-words">
          Search Results for <span className="text-green-500 italic">"{decodeKeyword}"</span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium">
          Found {api.length} results matching your query.
        </p>
      </div>

      {api.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {api.map((anime, index) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              icon={<PiStarFill className="text-yellow-500" />}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
          <PiSmileySad size={80} className="text-zinc-300 dark:text-zinc-600 mb-6" />
          <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300 mb-2">No results found</h2>
          <p className="text-zinc-500 max-w-md mb-8">
            We couldn't find any anime matching "{decodeKeyword}". Try checking your spelling or use different keywords.
          </p>
          <Link href="/" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-green-500/20">
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
