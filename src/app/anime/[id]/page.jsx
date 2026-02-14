import DetailAnime from "./DetailAnime";
import { getAnimeDetail } from "@/utils/libs/getAnimeDetail";

const page = async ({ params }) => {
  const animeDetail = await getAnimeDetail((await params).id)

  return (
    <DetailAnime anime={animeDetail} />
  );
};

export default page;
