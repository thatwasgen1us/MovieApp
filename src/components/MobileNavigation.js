import React from 'react'
import { NavLink } from 'react-router-dom'
import { mobileNavigation } from '../contents/navigation'

const MobileNavigation = () => {
	return (
		<section className='fixed bottom-0 z-40 w-full bg-black h-14 lg:hidden bg-opacity-60 backdrop-blur-2xl'>
			<div className='flex items-center justify-between h-full text-neutral-400'>
				{
					mobileNavigation.map((nav) => {
						return (
							<NavLink
								key={nav.label + "mobilenavigation"}
								to={nav.href}
								className={({isActive}) => `px-3 flex h-full items-center flex-col justify-center ${isActive && 'text-white'}`}
							>
								<div className='text-2xl'>
									{nav.icon}
								</div>
								<p className='text-sm'>{nav.label}</p>
							</NavLink>
						)
					})
				}
			</div>
		</section>
	)
}

export default MobileNavigation

