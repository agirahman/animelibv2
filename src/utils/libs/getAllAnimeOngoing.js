import { fetchData } from "../services/api";

export const getAllAnimeOngoing = async () => {
  const queryAllAnimeOngoing = `
    query {
      Page(perPage: 50) {
        media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC) {
          id
          title { romaji english }
          coverImage { large, color }
          meanScore
          format
        }
      }
    }
  `;

  const data = await fetchData(queryAllAnimeOngoing);
  return data?.Page?.media || [];
};