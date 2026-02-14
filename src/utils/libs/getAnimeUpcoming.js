import { fetchData } from "../services/api";

export const getAnimeUpcoming = async () => {
  const queryUpcoming = `
        query {
          Page(perPage:6) {
            media(type: ANIME, status: NOT_YET_RELEASED, sort: POPULARITY_DESC) {
              id
              title { romaji english }
              coverImage { large, color }
              popularity
              format
            }
          }
        }
      `;

  const data = await fetchData(queryUpcoming);
  return data?.Page?.media || [];
};