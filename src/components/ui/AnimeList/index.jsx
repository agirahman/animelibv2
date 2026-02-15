import AnimeCard from "./AnimeCard";

const AnimeList = ({ api }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-8">
      {api?.length > 0 ? (
        api.map((anime, index) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
          />
        ))
      ) : (
        <p>Tidak ada data untuk ditampilkan.</p>
      )}
    </div>
  );
};



export default AnimeList;
