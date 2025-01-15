import React, { useRef } from 'react'
import Card from './Card'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const HorizontalScrollCards = ({ data = [], heading, trending, media_type }) => {
	const containerRef = useRef()

	const handleNext = () => {
		containerRef.current.scrollLeft += 300
	}

	const handlePrev = () => {
		containerRef.current.scrollLeft -= 300
	}

	return (
		<div className='container px-3 mx-auto my-10'>
			<h2 className='mb-2 text-xl font-bold text-white capitalize lg:text-2xl'>{heading}</h2>

			<div className='relative'>
				<div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll overflow-hidden relative z-10 scroll-smooth transition-all scrollbar-none'>
					{
						data.map((data, index) => {
							return (
								<Card key={data.id + "heading" + index} data={data} index={index + 1} trending={trending} media_type={media_type}/>
							)
						})
					}
				</div>

				<div className='absolute top-0 items-center justify-between hidden w-full h-full lg:flex'>
					<button onClick={handlePrev} className='z-10 p-1 -ml-2 text-black bg-white rounded-full'>
						<FaAngleLeft />
					</button>
					<button onClick={handleNext} className='z-10 p-1 -ml-2 text-black bg-white rounded-full'>
						<FaAngleRight />
					</button>
				</div>
			</div>
		</div>
	)
}

export default HorizontalScrollCards
