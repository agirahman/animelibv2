import { fetchData } from "../services/api";

export const getAllAnimePopular = async (page = 1, perPage = 20) => {
    const queryAllAnimePopular = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
          currentPage
        }
        media(type: ANIME, isAdult: false, sort: SCORE_DESC) {
          id
          title { romaji english }
          coverImage { large, color }
          meanScore
          format
        }
      }
    }
  `;

    const data = await fetchData(queryAllAnimePopular, { page, perPage });
    return {
        anime: data?.Page?.media || [],
        pageInfo: data?.Page?.pageInfo || { hasNextPage: false }
    };
};