import AnimeCard from "@/components/AnimeList/AnimeCard";
import Header from "@/components/Header";
import { FcLike } from "react-icons/fc";
import { fetchData } from "@/utils/services/api";
import { MdOutlineUpcoming } from "react-icons/md";
import React from "react";

const queryUpcoming = `
    query {
      Page(perPage:50) {
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

const page = async () => {
  const api = await fetchData(queryUpcoming);

  return (
    <div className="min-h-screen pb-12">
      <div className="flex flex-col items-center justify-center mb-8 mt-4">
        <div className="flex items-center gap-3">
          <MdOutlineUpcoming className="text-green-500" size={36} />
          <h1 className="text-3xl md:text-4xl font-bold">Upcoming Anime</h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-center max-w-xl">
          Lihat daftar anime yang akan datang di musim berikutnya. Tandai favoritmu dan jangan sampai kelewatan!
        </p>
      </div>
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 sm:gap-8 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {api.length > 0 ? (
          api.map((anime, index) => (
            <AnimeCard key={anime.id} anime={anime} icon={<FcLike />} index={index} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
            <img src="/not-found.svg" alt="No Result" className="w-40 mb-4 opacity-70" />
            <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300 mb-2">No results found</h2>
            <p className="text-zinc-500 max-w-md mb-8 text-center">
              Tidak ada anime yang akan datang ditemukan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

