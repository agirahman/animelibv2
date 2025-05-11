import Image from "next/image";
import Link from "next/link";
import { PiStarFill } from "react-icons/pi";

const SearchAnime = ({ api }) => {
  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 sm:gap-8 gap-4">
      {api.length > 0 ? (
        api.map((anime) => {
        return (
          <Link key={anime.id} href={`#`} className="group">
            <Image
              src={anime.coverImage.large}
              alt="anime cover"
              width={350}
              height={250}
              className="rounded group-hover:scale-102 transition-all w-full max-h-72 aspect-[11/16] object-cover group-hover:shadow-lg"
            />

            <h1 className="font-medium sm:text-md md:text-md text-sm mt-2 group-hover:text-green-400 transition-all truncate">
              {anime.title.romaji || anime.title.english}
            </h1>
            <div className="flex text-sm items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="text-yellow-400">
                <PiStarFill />
                </div>
                <span className="text-gray-500">{anime.meanScore / 10}</span>
              </div>
              <span className="text-gray-500 truncate">{anime.format}</span>
            </div>
          </Link>
        );
      })
      ) : (
        <p>data tidak ada</p>
      )}
    </div>
  );
};

export default SearchAnime;
