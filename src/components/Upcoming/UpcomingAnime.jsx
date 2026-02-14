import { getAnimeUpcoming } from "@/utils/libs/getAnimeUpcoming";
import AnimeList from "@/components/AnimeList";
import TitleList from "@/components/AnimeList/TitleList";

const UpcomingAnime = async () => {
    const upcomingAnime = await getAnimeUpcoming();

    return (
        <section>
            <TitleList link="/upcoming" title="Upcoming Anticipated" />
            <AnimeList api={upcomingAnime} />
        </section>
    );
};

export default UpcomingAnime;
