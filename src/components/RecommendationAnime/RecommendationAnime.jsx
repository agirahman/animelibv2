import { getAnimeRecommendations } from "@/utils/libs/getAnimeRecommendation";
import Image from "next/image";
import Link from "next/link";


const RecommendationAnime = async () => {
      const recommendations = await getAnimeRecommendations();
    return {
// {recommendations.map((anime) =>)}
    }
}
