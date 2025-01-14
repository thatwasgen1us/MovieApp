import React from 'react'
import { useSelector } from 'react-redux'
import BannerHome from '../components/BannerHome'
import HorizontalScrollCards from '../components/HorizontalScrollCards'
import useFetch from '../hooks/useFetch'

const Home = () => {
  const trendingData = useSelector(state => state.movieData.bannerData)
  const { data: nowPlayingData } = useFetch("/movie/now_playing")
  const { data: topRatedData } = useFetch("/movie/top_rated")
  const { data: popularTvShowData } = useFetch("/tv/popular")
  const { data: onTheAirShowData } = useFetch("/tv/on_the_air")


  return (
    <div>
      <BannerHome />
      <HorizontalScrollCards data={trendingData} heading={"Trending"} trending={true} />
      <HorizontalScrollCards data={nowPlayingData} heading={"Now Playing"} />
      <HorizontalScrollCards data={topRatedData} heading={"Top Rated Movies"} />
      <HorizontalScrollCards data={popularTvShowData} heading={"Popular TV Show"} />
      <HorizontalScrollCards data={onTheAirShowData} heading={"On The Air "} />


    </div>
  )
}

export default Home
