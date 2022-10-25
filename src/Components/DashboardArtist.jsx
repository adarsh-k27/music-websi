import React from 'react'
import {useContext} from 'react'
import {Music_Context} from '../context/index'
import SongCard from './songCard'
function DashboardArtist() {
  const {allArtists}=useContext(Music_Context).state
  return (
    <div className='w-full h-full p-3 my-3'>
      <div className="w-full flex flex-wrap gap-2 items-center justify-center ">
         {
          allArtists.map((artist)=>(
            <SongCard type={"artist"} data={artist} />
          ))
         }
      </div>
    </div>
  )
}

export default DashboardArtist;