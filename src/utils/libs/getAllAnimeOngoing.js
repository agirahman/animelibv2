import { fetchData } from "../services/api";

export const getAllAnimeOngoing = async (page = 1, perPage = 20) => {
  const queryAllAnimeOngoing = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
          currentPage
        }
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

  const data = await fetchData(queryAllAnimeOngoing, { page, perPage });
  return {
    anime: data?.Page?.media || [],
    pageInfo: data?.Page?.pageInfo || { hasNextPage: false }
  };
};