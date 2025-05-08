"use client";

import React from "react";

import { useState, useEffect } from "react";
import AnimeList from "@/utils/AnimeList";
import TitleList from "@/utils/TitleList";

const SeasonUpcomingAnime = () => {
  const [animes, setAnimes] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const updateLimit = () => {
      if (window.innerWidth <= 768) {
        setLimit(6);
      } else {
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/upcoming?limit=10`
      );
      const data = await response.json();
      setAnimes(data.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 sm:gap-8 gap-4">
        {Array.isArray(animes) ? animes.slice(0, limit).map((anime, index) => (
          <div key={index} className="rounded">
            <AnimeList
              idAnime={`${anime.mal_id}`}
              images={anime.images.webp.image_url}
              titleAnime={anime.title}
              likeAnime={anime.favorites}
              serialAnime={anime.type}
            />
          </div>
        )) : null}
      </div>
    </>
  );
};

export default SeasonUpcomingAnime;
