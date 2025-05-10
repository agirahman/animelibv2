import AnimeList from "@/components/AnimeList";
import PopularList from "@/components/AnimeList/PopularList";
import TitleList from "@/components/AnimeList/TitleList";

const HomePage =  async () => {
  const responseSeasonUpcoming = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/upcoming?limit=6`)
  const responseSeasonNow = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/now?limit=6`)
  const responseTopAnime = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=10`)

  const seasonUpcomingAnime = await responseSeasonUpcoming.json()
  const seasonNowAnime = await responseSeasonNow.json()
  const topAnime = await responseTopAnime.json()

  

  return (
    <div className="mt-4">
      <section>
        <TitleList link={"/season-now"} title="Now Airing Anime" />
        <AnimeList api={seasonNowAnime}/>
      </section>

      <section className="mt-8">
        <TitleList link="/season-upcoming" title="Next Seaon Anime" />
        <AnimeList api={seasonUpcomingAnime}/>
      </section>

      <section className="mt-8">
        <TitleList link="/top-anime" title="Popular Anime" />
        <PopularList api={topAnime} />
      </section>
    </div>
  );
};

export default HomePage;
