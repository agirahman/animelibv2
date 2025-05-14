import Image from "next/image";

const getAnimeById = async (id) => {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title { romaji, english }
        coverImage { large, color }
        bannerImage
      }
    }
  `;

  const variables = { id: parseInt(id) };

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  return data.data.Media;
};

const page = async ({ params }) => {
  const anime = await getAnimeById(params.id);

  return (
    <div className="">
      <div className="relative">
        <div className="">
          <Image
            src={anime.bannerImage || anime.coverImage.large}
            alt="banner image"
            width={1200}
            height={35}
            className="rounded w-full max-h-48 aspect-[11/16] object-cover"
          />
        </div>
        <div className="">
          <div className="absolute flex gap-2 top-25 pl-2 w-full ">
            <div className="w-48">

            <Image
              src={anime.coverImage.large}
              alt={"cover anime"}
              width={150}
              height={150}
              className="rounded top-20 left-4 w-40  max-h-72 aspect-[11/16] object-cover shadow-lg"
              
              /> 
              <h1>{anime.title.romaji}</h1>
              <h1>{anime.id}</h1>
              </div>
            <div className="pt-23 w-full">
              <h1 className="font-bold text-lg">{anime.title.romaji}</h1>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
