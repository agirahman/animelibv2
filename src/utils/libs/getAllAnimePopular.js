import { fetchData } from "../services/api";

export const getAllAnimePopular = async () => {
    const queryAllAnimePopular = `
    query {
      Page(perPage: 50) {
        media(type: ANIME, sort: SCORE_DESC) {
          id
          title { romaji english }
          coverImage { large, color }
          meanScore
          format
        }
      }
    }
  `;

    const data = await fetchData(queryAllAnimePopular);
    return data?.Page?.media || [];
};