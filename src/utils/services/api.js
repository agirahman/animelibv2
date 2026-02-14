export const fetchData = async (query, variables = {}) => {
  try {
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

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Fetch Data Error:", error);
    return null;
  }
};