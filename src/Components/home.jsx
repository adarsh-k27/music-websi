import React, { useContext } from 'react'
import { Music_Context } from '../context'
import { Header } from './index'
function Home () {
  const data = useContext(Music_Context)
  console.log('DATA', data)
  return (
    <div className='w-screen h-screen bg-white'>
      <Header />
    </div>
  )
}

export default Home
