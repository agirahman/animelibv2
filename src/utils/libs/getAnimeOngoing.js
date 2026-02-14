import { fetchData } from "../services/api";

export const getAnimeOngoing = async () => {
  const queryOngoing = `
    query {
      Page(perPage: 6) {
        media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC) {
          id
          title { romaji english }
          coverImage { large, color }
          popularity
          format
        }
      }
    }
  `;
  const data = await fetchData(queryOngoing);
  return data?.Page?.media || [];
};