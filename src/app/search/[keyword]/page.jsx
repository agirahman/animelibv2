import SearchAnime from "./SearchAnime"

const SearchPage = async ({ params }) => {
  const { keyword } = await params
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${keyword}`)
  const searchAnime = await response.json()

  const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

  const decodeKeyword = decodeURIComponent(keyword)
  const camelCaseKeyword = toCamelCase(decodeKeyword)

  return (
    <>
    <h1 className="sm:text-xl text-lg flex justify-center mb-4 font-semibold">Result For {camelCaseKeyword}</h1>
    <SearchAnime api={searchAnime}/>
    </>
  )
}

export default SearchPage