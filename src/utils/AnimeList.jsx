import Image from "next/image";
import Link from "next/link";
import { FcLike } from "react-icons/fc";

const AnimeList = ({ api }) => {
  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 sm:gap-8 gap-4">
      {api.data.map((anime, index) => (
        <Link key={index} href={`/anime/${anime.mal_id}`} className="group">
          <Image
            src={anime.images.webp.image_url}
            alt="anime cover"
            width={350}
            height={250}
            priority
            className="rounded group-hover:scale-102 transition-all  w-full max-h-72 aspect-[11/16] object-cover group-hover:shadow-lg"
          />

          <h1 className="font-medium sm:text-md md:text-md text-sm mt-2 group-hover:text-green-400 transition-all truncate">
            {anime.title}
          </h1>
          <div className="flex text-sm items-center justify-between ">
            <div className="flex items-center gap-1">
              <FcLike />
              <span className="text-gray-400">{anime.favorites}</span>
            </div>
            <span className="text-gray-400">{anime.type}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AnimeList;

/* 
<Link href={idAnime} className="group">
      <Image
        src={images}
        alt="anime cover"
        width={350}
        height={250}
        priority
        className="rounded group-hover:scale-102 transition-all  w-full max-h-72 aspect-[11/16] object-cover group-hover:shadow-lg"
      />

      <h1 className="font-medium sm:text-md md:text-md text-sm mt-2 group-hover:text-green-400 transition-all truncate">
        {titleAnime}
      </h1>
      <div className="flex text-sm items-center justify-between ">
        <div className="flex items-center gap-1">
          <FcLike />
          <span className="text-gray-400">{likeAnime}</span>
        </div>
        <span className="text-gray-400">{serialAnime}</span>
      </div>
    </Link>
*/
