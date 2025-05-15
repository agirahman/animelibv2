import DetailAnime from "./DetailAnime";


const getAnimeById = async (id) => {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title { romaji, english }
        coverImage { large, color }
        studios (isMain: true) {
          nodes { name }
        }
        bannerImage
        genres
        description
        meanScore
        popularity
        type
        format
        startDate { year, month, day }
        endDate { year, month, day }
        season
        seasonYear
        episodes
        duration
        hashtag
        reviews(sort: RATING_DESC, perPage: 25) {
          nodes {
            id
            summary
            rating
            user {
              name
              avatar { large }
            }
          }
        }
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
    <DetailAnime anime={anime} />
  );
};

export default page;
