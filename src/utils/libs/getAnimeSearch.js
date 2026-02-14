import { fetchData } from "../services/api";

export const getAnimeSearch = async (keyword) => {
  const query = `
    query ($search: String) {
      Page(perPage: 50) {
        media(search: $search, type: ANIME, isAdult: false, sort: POPULARITY_DESC) {
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

  const data = await fetchData(query, { search: keyword });
  const dataAnimeSearch = data?.Page?.media || [];
  const decodeKeyword = decodeURIComponent(keyword);

  return { dataAnimeSearch, decodeKeyword };
};