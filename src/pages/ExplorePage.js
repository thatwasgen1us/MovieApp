import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from '../components/Card'

const ExplorePage = () => {
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)


  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo
        }
      })
      setData((preve) => {
        return [
          ...preve,
          ...response.data.results
        ]
      })
      setTotalPageNo(response.data.total_pages)
    } catch (error) {
      console.log(error)
    }
  }

  const handelScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNo(preve => preve + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(() => {
    window.addEventListener('scroll', handelScroll)
  }, [])

  return (
    <div className='pt-16'>
      <div className='container mx-auto'>
        <h3 className='my-3 text-lg font-semibold capitalize lg:text-xl'>Popular {params.explore} Show</h3>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6'>
          {
            data.map((exploreData, index) => {
              return (
                <Card key={exploreData + index + 'exploreSection'} data={exploreData} />
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default ExplorePage
