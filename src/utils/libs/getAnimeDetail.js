import { fetchData } from "../services/api";

export const getAnimeDetail = async (id) => {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title { romaji, english }
        coverImage { large, color }
        studios (isMain: true) {
          nodes { name }
        }
        bannerImage
        genres
        description
        meanScore
        popularity
        type
        format
        startDate { year, month, day }
        endDate { year, month, day }
        season
        seasonYear
        episodes
        duration
        hashtag
        reviews(sort: RATING_DESC, perPage: 25) {
          nodes {
            id
            summary
            rating
            user {
              name
              avatar { large }
            }
          }
        }
        trailer {
          id
          site
          thumbnail
        }
        externalLinks {
          site
          url
          color
          icon
        }
      }
    }
  `;

  const data = await fetchData(query, { id: parseInt(id) });
  return data?.Media || null;
};