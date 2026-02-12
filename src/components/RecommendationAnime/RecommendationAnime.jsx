import { getAnimeRecommendations } from "@/utils/libs/getAnimeRecommendation";
import HeroSlider from "./HeroSlider";

const RecommendationAnime = async () => {
    const recommendations = await getAnimeRecommendations();

    return (
        <section>
            <HeroSlider recommendations={recommendations} />
        </section>
    );
};

export default RecommendationAnime;
