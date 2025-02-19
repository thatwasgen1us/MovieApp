import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='py-2 text-center bg-neutral-600 bg-opacity-35 text-neutral-400'>
      <div className='flex items-center justify-center gap-4'>
        <Link to={'https://github.com/thatwasgen1us'}>About</Link>
        <Link to={'https://t.me/thatwasgen1us'}>Contact</Link>
      </div>
      <p className='text-sm'>
        Creating by Egor Polovko
      </p>
    </footer>
  )
}

export default Footer

