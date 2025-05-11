import SearchAnime from "./SearchAnime";

const SearchPage = async ({ params }) => {
  const { keyword } = await params;

  const query = `
    query ($search: String) {
      Page(perPage: 50) {
        media(search: $search, type: ANIME, isAdult: false, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          meanScore
          format
        }
      }
    }
  `;

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables: { search: keyword }
    })
  });

  const data = await response.json();
  const searchAnime = data.data.Page.media;

  // Keyword formatting (opsional)
  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const decodeKeyword = decodeURIComponent(keyword);
  const camelCaseKeyword = toCamelCase(decodeKeyword);

  return (
    <>
      <h1 className="sm:text-xl text-lg flex justify-center mb-4 font-semibold">
        Result For {camelCaseKeyword}
      </h1>
      <SearchAnime api={searchAnime} />
    </>
  );
};


export default SearchPage;
