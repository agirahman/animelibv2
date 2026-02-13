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
    <div className="min-h-screen pb-12">
      {/* Search Header */}
      <div className="relative mb-12 mt-6 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 shadow-sm max-w-7xl mx-auto">
        <div className="absolute top-0 right-0 -m-8 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -m-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-500 text-xs font-bold rounded-full uppercase tracking-wider">
              Search Results
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-zinc-900 dark:text-white leading-tight">
            Results for <span className="text-green-500 italic">"{decodeKeyword}"</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Found <span className="font-bold text-zinc-900 dark:text-white">{api.length}</span> titles matching your research. Ready to dive into something new?
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {api.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-8">
            {api.map((anime, index) => (
              <AnimeCard
                key={anime.id}
                anime={anime}
                index={index}
                icon={<PiStarFill className="text-yellow-500" />}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="p-8 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-6">
              <PiSmileySad size={64} className="text-zinc-400 dark:text-zinc-500" />
            </div>
            <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">No results found</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-10 text-lg">
              We couldn't find any anime matching "{decodeKeyword}". Maybe try another masterpiece?
            </p>
            <Link
              href="/"
              className="px-10 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-green-500/30 flex items-center gap-2"
            >
              Back to Discover
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
