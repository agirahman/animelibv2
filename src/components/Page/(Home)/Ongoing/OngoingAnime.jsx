import { getAnimeOngoing } from "@/utils/libs/getAnimeOngoing";
import AnimeList from "@/components/ui/AnimeList";
import TitleList from "@/components/ui/AnimeList/TitleList";

const OngoingAnime = async () => {
    const ongoingAnime = await getAnimeOngoing();

    return (
        <section>
            <TitleList link="/ongoing" title="Ongoing Highlights" />
            <AnimeList api={ongoingAnime} />
        </section>
    );
};

export default OngoingAnime;
