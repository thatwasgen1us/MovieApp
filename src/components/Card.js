import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'


const Card = ({ data, trending, index }) => {
	const imageURL = useSelector(state => state.movieData.imageURL)

	return (
		<Link to={'/' + data.media_type + '/' + data.id} className='w-full max-w-[230px] min-w-[230px] rounded h-80 block overflow-hidden relative hover:scale-110 transition-all '>
			<img
				src={imageURL + data?.poster_path}
			/>
			<div className='absolute top-4'>
				{
					trending && (
						<div className='px-4 py-1 overflow-hidden rounded-r-full bg-black/60 backdrop-blur-3xl'>
							#{index} Trending
						</div>
					)
				}
			</div>

			<div className='absolute bottom-0 w-full h-16 p-2 bg-black/60 h-14 backdrop-blur-3xl'>
				<h2 className='text-lg font-semibold text-ellipsis line-clamp-1'>{data?.title || data?.name}</h2>
				<div className='flex items-center justify-between text-sm text-neutral-400'>
					<p>{moment(data.release_date).format("MMMM Do YY")}</p>
					<p className='px-1 text-xs text-white bg-black rounded-full'>Rating: {Number(data.vote_average).toFixed(1)}</p>
				</div>
			</div>
		</Link>
	)
}

export default Card
