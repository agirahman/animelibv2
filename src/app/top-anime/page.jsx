import React from 'react'
import TopAnime from './TopAnime';

const queryNow = `
    query {
      Page(perPage: 50) {
        media(type: ANIME, sort: SCORE_DESC) {
          id
          title { romaji english }
          coverImage { large }
          averageScore
          format
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

const page = async () => {
  const topAnime = await fetchAnilist(queryNow)
  return (
    <TopAnime api={topAnime} />
  )
}

export default page