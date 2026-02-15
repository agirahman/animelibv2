export const fetchData = async (query, variables = {}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
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