import { getAnimePopular } from "@/utils/libs/getAnimePopular";
import TopAnimeList from "@/components/AnimeList/TopAnimeList";
import TitleList from "@/components/AnimeList/TitleList";

const PopularAnime = async () => {
    const topAnime = await getAnimePopular();

    return (
        <section>
            <div className="mb-8">
                <TitleList link="/popular" title="Most Popular Rankings" />
                <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm md:text-base max-w-2xl">
                    Curated list of the highest rated anime masterpieces of all time. Explore the legends.
                </p>
            </div>
            <TopAnimeList api={topAnime} />
        </section>
    );
};

export default PopularAnime;
