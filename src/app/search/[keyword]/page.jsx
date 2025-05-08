import SearchAnime from "./SearchAnime"

const SearchPage = async ({ params }) => {
  const keyword = params.keyword
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${keyword}`)
  const searchAnime = await response.json()

  return (
    <>
    <h1 className="text-xl">Result For {keyword}</h1>
    <SearchAnime api={searchAnime}/>
    </>
  )
}

export default SearchPage