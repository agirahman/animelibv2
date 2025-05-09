import AnimeList from "@/utils/AnimeList";
import TitleList from "@/utils/TitleList";

const HomePage =  async () => {
  const responseSeasonUpcoming = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/upcoming?limit=6`)
  const responseSeasonNow = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/now?limit=6`)

  const seasonUpcomingAnime = await responseSeasonUpcoming.json()
  const seasonNowAnime = await responseSeasonNow.json()

  return (
    <div className="mt-4">
      <section>
        <TitleList link={"#"} title="POPULAR THIS SEASON" />
        <AnimeList api={seasonNowAnime}/>
      </section>

      <section className="mt-8">
        <TitleList link="#" title="UPCOMING NEXT SEASON" />
        <AnimeList api={seasonUpcomingAnime}/>
      </section>
    </div>
  );
};

export default HomePage;
