import React, { useRef, useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Music_Context } from '../context/index'
import { GetAllSongs } from '../apiHelper/song'
import {MusicPlayer} from '../Components/index'
import SongCard from './songCard'
function DashboardSongs ({deleteBtn}) {
  const {allSongs,Playing}=useContext(Music_Context).state
  const {SetAllSongs}=useContext(Music_Context)
  const [isFocus, setFocus] = useState(true)
  
  useEffect(()=>{

   GetAllSongs(SetAllSongs)
   
  },[])

  const SongContainer = () => {
    return (
      <div className='w-full h-auto flex flex-col gap-2'>
        <p className='text-xs '>{allSongs?.length}</p>
        <div className='w-full h-auto flex flex-wrap gap-4 items-center justify-center'>
          {
            allSongs && allSongs.map((song,index)=>{
              return <SongCard type={'song'} data={song} deleteBtn={deleteBtn} index={index} />

            })
          }
        </div>
      </div>
    )
  }
  return (
    <div className='w-screen h-auto flex flex-col gap-6'>
      <div className='flex flex-row w-full py-2 gap-16 items-center justify-center'>
        <div className='px-1 py-1 flex items-center justify-center hover:bg-white/50 hover:border-black/20 border-2 border-solid'>
          <Link to={'/dashboard/new-song'}>
            <AiOutlinePlus className='text-black/40 text-base ' />
          </Link>
        </div>

        <div className='w-28 h-auto'>
          <input
            type='text'
            placeholder='Search Here..'
            className={`w-full font-serif rounded-md focus:border-black/20 border-2 border-solid`}
          />
        </div>
      </div>
      <SongContainer />
      
      
    </div>
  )
}

export default DashboardSongs
