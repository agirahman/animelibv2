const getAnimeById = async (id) => {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title { romaji, english}
      }
    }
  `;

  const variables = { id: parseInt(id) };

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  return data.data.Media;
};

const DetailAnime = async ({ id }) => {
  const anime = await getAnimeById(id)

  return (
    <div>
      <h1>{anime?.title?.romaji}</h1>
      <h1>{anime?.id}</h1>
    </div>
  )
}

export default DetailAnime