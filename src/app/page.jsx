import AnimeList from "@/components/AnimeList";
import PopularList from "@/components/AnimeList/PopularList";
import TitleList from "@/components/AnimeList/TitleList";
import AnimeRecommendationsSlider from "@/components/RecommendationAnime/RecommendationAnime";
import { fetchData } from "@/utils/services/api";
import { RiH1 } from "react-icons/ri";

const queryNow = `
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

const queryRandomAnime = `
  query {
  Page(perPage: 50) {
    recommendations {
      mediaRecommendation {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
}
`;

const HomePage = async () => {
  const seasonNowAnime = await fetchData(queryNow);
  const seasonUpcomingAnime = await fetchData(queryUpcoming);
  const topAnime = await fetchData(queryPopular);
  const recommendationAnime = await fetchData(queryRandomAnime)
  console.log({recommendationAnime})

  return (
    <div className="mt-4">
      {/* <section>
        <AnimeRecommendationsSlider />
      </section> */}

      <section>
        <TitleList link="/season-now" title="Now Airing Anime" />
        <AnimeList api={seasonNowAnime} />
      </section>

      <section className="mt-8">
        <TitleList link="/season-upcoming" title="Next Season Anime" />
        <AnimeList api={seasonUpcomingAnime} />
      </section>

      <section className="mt-8">
        <TitleList link="/top-anime" title="Top Anime" />
        <PopularList api={topAnime} />
      </section>
    </div>
  );
};

export default HomePage;
