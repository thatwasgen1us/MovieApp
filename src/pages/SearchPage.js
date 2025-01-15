import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const SearchPage = () => {
  const location = useLocation()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const query = location?.search?.slice(3)

  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query: query,
          page: page
        }
      })
      setData((preve) => {
        return [
          ...preve,
          ...response.data.results
        ]
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (query) {
      setPage(1)
      setData([])
      fetchData()
    }

  }, [location?.search])

  const handelScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPage(preve => preve + 1)
    }
  }

  useEffect(() => {
    if (query) {
      fetchData()
    }
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handelScroll)
  }, [])

  return (
    <div className='py-16'>

      <div className='sticky z-30 mx-1 my-2 top-[70px] lg:hidden text-neutral-900'>
        <input
          type='text'
          placeholder='Search here...'
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className='w-full px-4 py-1 text-lg bg-white rounded-full'
          value={query?.split('%20')?.join(' ')}
        />
      </div>

      <div className='container mx-auto'>
        <h3 className='my-3 text-lg font-semibold capitalize lg:text-xl'>Search Results</h3>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {
            data.map((searchData, index) => {
              return (
                <Card key={searchData + index + 'searchSection'} data={searchData} media_type={searchData.media_type} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage
