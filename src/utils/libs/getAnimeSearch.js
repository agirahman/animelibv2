import { fetchData } from "../services/api";

export const getAnimeSearch = async (keyword, page = 1, perPage = 24) => {
  const query = `
    query ($search: String, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
          currentPage
        }
        media(search: $search, type: ANIME, isAdult: false, sort: SEARCH_MATCH) {
          id
          title { romaji english }
          coverImage { large, color }
          meanScore
          format
          popularity
        }
      }
    }
  `;

  const data = await fetchData(query, { search: keyword, page, perPage });
  const dataAnimeSearch = data?.Page?.media || [];
  const pageInfo = data?.Page?.pageInfo || { hasNextPage: false };
  const decodeKeyword = decodeURIComponent(keyword);

  return { dataAnimeSearch, pageInfo, decodeKeyword };
};