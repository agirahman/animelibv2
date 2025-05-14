import { FcLike } from "react-icons/fc";
import AnimeCard from "./AnimeCard";

const AnimeList = ({ api }) => {
  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 sm:gap-8 gap-4">
      {api?.length > 0 ? (
        api.map((anime) => <AnimeCard key={anime.id} anime={anime} icon={<FcLike />}/>)
      ) : (
        <p>Tidak ada data untuk ditampilkan.</p>
      )}
    </div>
  );
};



export default AnimeList;
