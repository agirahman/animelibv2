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
    Page(perPage: 24) {
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
  // console.log({recommendationAnime})

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <section className="mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimeRecommendationsSlider />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 mt-12">
        {/* Now Airing Section */}
        <section>
          <TitleList link="/season-now" title="Now Airing Anime" />
          <AnimeList api={seasonNowAnime} />
        </section>

        {/* Upcoming Section */}
        <section>
          <TitleList link="/season-upcoming" title="Next Season Anime" />
          <AnimeList api={seasonUpcomingAnime} />
        </section>

        {/* Top Anime Section */}
        <section>
          <TitleList link="/top-anime" title="Top Anime" />
          <PopularList api={topAnime} />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
