import Image from "next/image";
import Link from "next/link";
import { FcLike } from "react-icons/fc";
import { PiStarFill } from "react-icons/pi";

import AnimeCard from "./AnimeCard";

const PopularList = ({ api }) => {
  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 sm:gap-8 gap-4">
      {api?.map((anime, index) => (
        <AnimeCard
          key={anime.id}
          anime={anime}
          icon={<FcLike />}
          index={index}
        />
      ))}
    </div>
  );
};

export default PopularList;
