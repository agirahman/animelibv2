export const fetchData = async (query) => {
  const res = await fetch(`https://graphql.anilist.co`, {
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