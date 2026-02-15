import DetailAnime from "./DetailAnime";
import { getAnimeDetail } from "@/utils/libs/getAnimeDetail";

const AnimePage = async ({ params }) => {
  const animeDetail = await getAnimeDetail((await params).id)

  return (
    <DetailAnime anime={animeDetail} />
  );
};

export default AnimePage;
