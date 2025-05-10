import React from 'react'
import TopAnime from './TopAnime'

const page = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime`)
  const data = await response.json()

  return (
    <>
    <TopAnime api={data} />
    </>
  )
}

export default page