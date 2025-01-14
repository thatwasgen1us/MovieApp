import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetchDetail from '../hooks/useFetchDetail';

const DetailsPage = () => {
  const params = useParams()
  const imageURL = useSelector(state => state.movieData.imageURL)
  const { data } = useFetchDetail(`/${params?.explore}/${params?.id}`)
  const { data: castData } = useFetchDetail(`/${params?.explore}/${params?.id}/credits`)

  console.log(data)

  return (
    <div>
      <div className='w-full h-[280px] relative hidden lg:block'>

        <div className='w-full h-full h-'>
          <img
            src={imageURL + data?.backdrop_path}
            className="object-cover w-full h-full"
          />
        </div>

        <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900/90 to-transparent' >
        </div>

      </div>

      <div className='container flex flex-col items-center gap-5 px-3 py-16 mx-auto lg:py-0 lg:flex-row lg:gap-10'>
        <div className='relative mx-auto lg:mx-0 lg:-mt-28 w-fit'>
          <img
            src={imageURL + data?.poster_path}
            className="object-cover rounded w-60 h-80"
          />
        </div>

        <div>
          <h2 className='text-2xl font-bold text-white'>
            {data?.title || data?.name}
          </h2>
          <p className='text-neutral-400'>
            {data.tagline}
          </p>

          <div>
            <div>
              {Number(data.vote_average).toFixed(1)}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsPage
