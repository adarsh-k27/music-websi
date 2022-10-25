import React from 'react'
import {useContext} from 'react'
import {Music_Context} from '../context/index'
import SongCard from './songCard'
function DashboardAlbum() {
  const {allAlbums}=useContext(Music_Context).state
  return (
    <div className='w-full h-full p-3 my-3'>
      <div className="w-full flex flex-wrap gap-2 items-center justify-center ">
         {
          allAlbums.map((album)=>(
            <SongCard type={"album"} data={album} />
          ))
         }
      </div>
    </div>
  )
}

export default DashboardAlbum;