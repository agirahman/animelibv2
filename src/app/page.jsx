import AnimeList from "@/components/AnimeList";
import PopularList from "@/components/AnimeList/PopularList";
import TitleList from "@/components/AnimeList/TitleList";

const queryNow = `
    query {
      Page(perPage: 6) {
        media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC) {
          id
          title { romaji english }
          coverImage { large }
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
          coverImage { large }
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
        coverImage { large }
        genres
        popularity
        format
        episodes
        averageScore
        status
        endDate { year }
      }
    }
  }
`;

const fetchAnilist = async (query) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_NEW_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });
  const { data } = await res.json();
  return data?.Page?.media || [];
};

const HomePage = async () => {
  // const responseSeasonUpcoming = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/upcoming?limit=6`)
  // const responseSeasonNow = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/now?limit=6`)
  // const responseTopAnime = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=10`)

  // const seasonUpcomingAnime = await responseSeasonUpcoming.json()
  // const seasonNowAnime = await responseSeasonNow.json()
  // const topAnime = await responseTopAnime.json()

  const seasonNowAnime = await fetchAnilist(queryNow);
  const seasonUpcomingAnime = await fetchAnilist(queryUpcoming);
  const topAnime = await fetchAnilist(queryPopular);

  return (
    <div className="mt-4">
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
