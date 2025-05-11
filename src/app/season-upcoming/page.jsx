import SeasonUpcomingAnime from "./SeasonUpcomingAnime"

const queryUpcoming = `
    query {
      Page(perPage:50) {
        media(type: ANIME, status: NOT_YET_RELEASED, sort: POPULARITY_DESC) {
          id
          title { romaji english }
          coverImage { large }
          popularity
          format
        }
      }
    }
  `;

const fetchAnilist = async (query) => {
  const res = await fetch(`https://graphql.anilist.co`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });
  const { data } = await res.json();
  return data?.Page?.media || [];
};

const page = async () => {
const seasonUpcoming = await fetchAnilist(queryUpcoming)
  return (
    <>
    <SeasonUpcomingAnime api={seasonUpcoming} />
    </>
  )
}

export default page 