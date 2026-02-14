import { fetchData } from "../services/api";

export const getAnimePopular = async () => {
  const queryPopular = `
    query {
      Page(perPage: 10) {
        media(type: ANIME, sort: SCORE_DESC) {
          id
          title { romaji english }
          coverImage { large, color }
          genres
          popularity
          format
          episodes
          meanScore
          season
          startDate {
            year
          }
        }
      }
    }
  `;
  const data = await fetchData(queryPopular);
  return data?.Page?.media || [];
};