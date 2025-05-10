import SeasonUpcomingAnime from "./SeasonUpcomingAnime"

const page = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/upcoming`)
    const data = await response.json()

  return (
    <>
    <SeasonUpcomingAnime api={data} />
    </>
  )
}

export default page