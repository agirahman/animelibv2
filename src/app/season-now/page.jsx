import React from 'react'
import SeasonNowAnime from './SeasonNowAnime'

const page = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/now`)
  const data = await response.json()

  return (
    <SeasonNowAnime api={data} />
  )
}

export default page