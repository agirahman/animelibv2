import { fetchData } from "../services/api";

export const getAllAnimeUpcoming = async (page = 1, perPage = 20) => {
    const queryUpcoming = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
          currentPage
        }
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

    const data = await fetchData(queryUpcoming, { page, perPage });
    return {
        anime: data?.Page?.media || [],
        pageInfo: data?.Page?.pageInfo || { hasNextPage: false }
    };
};