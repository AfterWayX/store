import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Link from 'next/link';

const Home: NextPage = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])
  return (
    <div className='flex bg-black bg-opacity-80 min-h-screen min-w-screen text-white'>
      <div className='w-full h-full flex flex-col items-center justify-center my-auto'>
        <h1 className={`mx-auto text-7xl opacity-0 transition-all duration-[4000ms] ${loaded ? 'opacity-100' : ''}`}>
          Hi, welcome to Shoes Store!
        </h1>
        <p className={`mt-4 text-3xl transition-all transform duration-[5000ms] ${loaded ? 'delay-[1000ms] opacity-100' : 'opacity-0'}`}>
          To continue follow the{' '}
          <a className='underline' target="_blank" href="https://github.com/AfterWayX/store-back">
            link 
          </a>, download api repository and follow instructions from {''}
          <a className='underline' target="_blank" href="https://github.com/AfterWayX/store-back/blob/master/README.md">
            readme.md
          </a> to start working with api.
        </p>
        <p className={`mt-4 text-3xl transition-all transform duration-[5000ms] ${loaded ? 'delay-[2000ms] opacity-100' : 'opacity-0'}`}>
          After you have completed all the steps go to {' '}
          <Link href="/products">
            <a className='underline'>
              products
            </a>
          </Link> page.
        </p>
        
      </div>
    </div>
  )
}

export default Home
