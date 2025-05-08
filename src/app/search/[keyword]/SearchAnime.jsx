import Image from "next/image";
import Link from "next/link";
import { PiStarFill } from "react-icons/pi";

const SearchAnime = ({ api }) => {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 sm:gap-8 gap-4">
      {api.data.map((anime, index) => {
        return (
          <Link key={index} href="#" className="group">
            <Image
              src={anime.images.webp.image_url}
              alt="anime cover"
              width={350}
              height={250}
              priority
              className="rounded group-hover:scale-102 transition-all w-full max-h-72 aspect-[11/16] object-cover group-hover:shadow-lg"
            />

            <h1 className="font-medium sm:text-md md:text-md text-sm mt-2 group-hover:text-green-400 transition-all truncate">
              {anime.title}
            </h1>
            <div className="flex text-sm items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="text-yellow-400">
                <PiStarFill />
                </div>
                <span className="text-gray-400">{anime.score}</span>
              </div>
              <span className="text-gray-400 truncate">{anime.type}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchAnime;
