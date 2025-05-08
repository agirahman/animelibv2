import SeasonNowAnime from "@/components/SeasonNowAnime";
import SeasonUpcommingAnime from "@/components/SeasonUpcomingAnime";
import TitleList from "@/utils/TitleList";

const HomePage = () => {
  return (
    <div className="mt-4">
      <section>
        <TitleList link={"#"} title="POPULAR THIS SEASON" />
        <SeasonNowAnime />
      </section>

      <section className="mt-8">
        <TitleList link="#" title="UPCOMING NEXT SEASON" />
        <SeasonUpcommingAnime />
      </section>
    </div>
  );
};

export default HomePage;
