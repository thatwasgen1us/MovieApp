import moment from 'moment';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Divider from '../components/Divider';
import useFetchDetail from '../hooks/useFetchDetail';
import useFetch from '../hooks/useFetch';
import HorizontalScrollCards from '../components/HorizontalScrollCards';
import VideoPlay from '../components/VideoPlay';


const DetailsPage = () => {
  const params = useParams()
  const imageURL = useSelector(state => state.movieData.imageURL)
  const { data } = useFetchDetail(`/${params?.explore}/${params?.id}`)
  const { data: castData } = useFetchDetail(`/${params?.explore}/${params?.id}/credits`)
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`)
  const { data: recommendationsData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`)
  const [playVideo, setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState('')

  const duration = Number((data.runtime) / 60).toFixed(1).split('.')

  const handlePlayVideo = () => {
    setPlayVideoId(data)
    setPlayVideo(true)
  }

  return (
    <div>
      <div className='w-full h-[280px] relative hidden lg:block'>

        <div className='w-full h-full '>
          <img
            src={imageURL + data?.backdrop_path}
            className="object-cover w-full h-full "
          />
        </div>

        <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900/90 to-transparent' >
        </div>

      </div>

      <div className='container flex flex-col gap-5 px-3 py-16 mx-auto lg:py-0 lg:flex-row lg:gap-10 '>
        <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
          <img
            src={imageURL + data?.poster_path}
            className="object-cover rounded w-60 h-80"
          />
          <button onClick={handlePlayVideo} className='w-full px-4 py-2 mt-4 font-bold text-black transition-all bg-white rounded shadow-md hover:bg-gradient-to-l from-red-700 to-orange-500 hover:scale-105'>
            Play Now
          </button>
        </div>

        <div>
          <h2 className='text-2xl font-bold text-white lg:text-4xl'>
            {data?.title || data?.name}
          </h2>
          <p className='text-neutral-400'>
            {data.tagline}
          </p>

          <Divider />

          <div className='flex items-center gap-4'>
            <p>
              Rating : {Number(data.vote_average).toFixed(1) || 'N/A'}+
            </p>
            <span>|</span>
            <p>
              View : {Number(data.vote_count).toFixed(0) || 'N/A'}
            </p>
            <span>|</span>
            {Array.isArray(duration) && duration.length === 2 && !isNaN(duration[0]) && !isNaN(duration[1]) ? (
              <p>
                Duration: {Number(duration[0])}h {Number(duration[1] * 6)}m
              </p>
            ) : (
              <p>Duration: N/A</p>
            )}
          </div>

          <Divider />

          <div>
            <h3 className='text-xl font-bold text-white'>
              Overview
            </h3>
            <p>
              {data?.overview}
            </p>

            <Divider />

            <div className='flex items-center gap-3 my-3 text-center'>
              <p>
                Status : {data?.status}
              </p>
              <span>|</span>
              <p>
                Release date : {moment(data?.release_date).format("MMMM Do YYYY") || 'No Date'}
              </p>
              <span>|</span>
              <p>
                Revenue: {Number(data?.revenue) ? Number(data.revenue).toLocaleString() : 'No Revenue'}
              </p>
            </div>

            <Divider />

          </div>

          <div>
            <p>
              <span className='text-white'>Director</span> : {castData?.crew?.[0]?.name || 'N/A'}
            </p>

            <Divider />

            <p>
              <span className='text-white'>Writer</span> : {castData?.crew?.filter((el) => el.job === 'Writer')?.map((el) => el.name)?.join(', ') || 'N/A'}
            </p>
          </div>

          <Divider />

          <h2 className='text-lg font-bold'>
            Cast:
          </h2>

          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5'>
            {
              castData?.cast?.filter((star) => star.profile_path).map((starCast) => {
                return (
                  <div key={starCast.id + "star"}>
                    <div>
                      <img
                        src={imageURL + starCast?.profile_path}
                        className='object-cover w-24 h-24 rounded-full'
                      />
                    </div>
                    <div>
                      <p className='text-sm font-bold text-center'>{starCast?.name}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      <div>
        <HorizontalScrollCards data={similarData} heading={'Similar ' + params?.explore} media_type={params?.explore} />
        <HorizontalScrollCards data={recommendationsData} heading={'Recommendation ' + params?.explore} media_type={params?.explore} />
      </div>

      {
        playVideo &&
        <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params?.explore} />
      }


    </div >
  )
}

export default DetailsPage
