export const fetchData = async (query, variables = {}) => {
  const res = await fetch(`https://graphql.anilist.co`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables
    }),
    next: { revalidate: 3600 },
  });
  const { data } = await res.json();
  return data?.Page?.media || [];
};