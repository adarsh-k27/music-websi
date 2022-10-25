import React, { useContext } from 'react'
import { FaUsers } from 'react-icons/fa'
import { GiLoveSong } from 'react-icons/gi'
import { HiOutlineMicrophone } from 'react-icons/hi'
import { MdLibraryMusic } from 'react-icons/md'
import { Music_Context } from '../context'
function DashboardHome () {
  const {allUsers}=useContext(Music_Context).state
  const colorArray = [
    'bg-orange-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-red-100',
    'bg-pink-200',
    'bg-violet-200'
  ]

  const HomeCard = ({ icon, name, length }) => {
    return (
      <div
        className={`w-40 h-auto px-3 py-4 shadow-lg rounded-md cursor-pointer ${
          colorArray[Math.floor(Math.random() * 4)]
        } `}
      >
        <div className='w-full h-full flex flex-col gap-4 items-center justify-center font-serif'>
          <p>{icon}</p>
          <p>{name}</p>
          <p>{length}</p>
        </div>
      </div>
    )
  }
  return (
    <div className='w-full h-auto p-4 py-2 flex flex-wrap justify-evenly items-center'>
      <HomeCard
        icon={<FaUsers className='text-xl' />}
        name={'Users'}
        length={allUsers.length}
      />
      <HomeCard icon={<GiLoveSong className='text-xl' />} name={'Songs'} length={'3'} />
      <HomeCard icon={<HiOutlineMicrophone className='text-xl'/>} name={'Artists'} length={'3'} />
      <HomeCard icon={<MdLibraryMusic className='text-xl'/>} name={'Albums'} length={'3'} />
    </div>
  )
}

export default DashboardHome
