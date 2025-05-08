"use client";

import { useState, useEffect } from "react";
import AnimeList from "../utils/AnimeList";
import TitleList from "../utils/TitleList";

const SeasonNowAnime = () => {
  const [animes, setAnimes] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    // Detect screen width and set limit accordingly
    const updateLimit = () => {
      if (window.innerWidth <= 768) {
        // Mobile screen
        setLimit(6);
      } else {
        // Larger screens
        setLimit(5);
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);

    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/now?limit=10`
      );
      const data = await response.json();
      setAnimes(data.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 sm:gap-8 gap-4">
        {Array.isArray(animes) ? animes.slice(0, limit).map((anime) => (
          <div key={anime.mal_id} className="rounded">
            <AnimeList
            idAnime={`/${anime.mal_id}`}
              titleAnime={anime.title}
              images={anime.images.webp.image_url}
              likeAnime={anime.favorites}
              serialAnime={anime.type }
            />
          </div>
        )) : null}
      </div>
    </>
  );
};

export default SeasonNowAnime;
