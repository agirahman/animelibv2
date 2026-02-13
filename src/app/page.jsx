import AnimeList from "@/components/AnimeList";
import PopularList from "@/components/AnimeList/PopularList";
import TitleList from "@/components/AnimeList/TitleList";
import TopAnimeList from "@/components/AnimeList/TopAnimeList";
import AnimeRecommendationsSlider from "@/components/RecommendationAnime/RecommendationAnime";
import { fetchData } from "@/utils/services/api";

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
  const [seasonNowAnime, seasonUpcomingAnime, topAnime] = await Promise.all([
    fetchData(queryNow),
    fetchData(queryUpcoming),
    fetchData(queryPopular)
  ]);

  return (
    <div className="min-h-screen pb-12 overflow-x-hidden">
      {/* Hero Section */}
      <section className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimeRecommendationsSlider />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 mt-8">
        {/* Now Airing Section */}
        <section>
          <TitleList link="/ongoing" title="Ongoing Highlights" />
          <AnimeList api={seasonNowAnime} priority={true} />
        </section>

        {/* Upcoming Section */}
        <section>
          <TitleList link="/upcoming" title="Upcoming Anticipated" />
          <AnimeList api={seasonUpcomingAnime} />
        </section>

        {/* Top Anime Section */}
        <section>
          <div className="mb-8">
            <TitleList link="/popular" title="Most Popular Rankings" />
            <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm md:text-base max-w-2xl">
              Curated list of the highest rated anime masterpieces of all time. Explore the legends.
            </p>
          </div>
          <TopAnimeList api={topAnime} />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
