export const getAnimeRecommendations = async () => {
  const randomPage = Math.floor(Math.random() * 10) + 1; // acak halaman 1–10

  const query = `
    query ($page: Int) {
      Page(page: $page, perPage: 10) {
        recommendations(sort: RATING_DESC) {
          mediaRecommendation {
            id
            title {
              romaji
            }
            coverImage {
              color
              large
            }
              bannerImage
          }
        }
      }
    }
  `;

  const variables = {
    page: randomPage,
  };

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 }, // cache 1 jam untuk kestabilan LCP
  });

  const json = await res.json();

  const recommendations = json.data?.Page?.recommendations || [];

  return recommendations
    .map((r) => r.mediaRecommendation)
    .filter((rec) => rec !== null);
};
