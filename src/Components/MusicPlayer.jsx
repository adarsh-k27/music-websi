import React, { useContext } from 'react'
import { Music_Context } from '../context/index'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { RiPlayListLine } from 'react-icons/ri'
import {AiFillCloseCircle} from 'react-icons/ai'
import { useState } from 'react'
import PlaylistCard from './PlaylistCard'
function MusicPlayer () {
  const { allSongs, Playing, PlayingIndex } = useContext(Music_Context).state
  const {SetPlaying, SetPlayingIndex}=useContext(Music_Context)
  const [isPlaylist, SetPlayList] = useState(false)
  return (
    <div className='w-full h-full flex flex-row justify-center items-center gap-3 '>
      <div className='mr-auto'
      onClick={(e)=>{
        e.preventDefault()
        SetPlaying(false)
        SetPlayingIndex(null)
      }}
      >
        <AiFillCloseCircle className='text-gray-500 text-md '/>
      </div>
      <div className='h-full'>
        <img
          src={allSongs[PlayingIndex]?.imageUrl}
          alt=''
          className='w-28 h-24 rounded-md'
        />
      </div>
      <div className='w-auto flex flex-col gap-1 items-start justify-start'>
        <p className='text-black/70 text-sm font-serif'>
          {allSongs[PlayingIndex]?.name.length >20 ? allSongs[PlayingIndex]?.name.splice(0,20) : allSongs[PlayingIndex]?.name}
          <span>{`(${allSongs[PlayingIndex]?.catogery})`}</span>
        </p>

        <RiPlayListLine
          onClick={() => {
            console.log("clillllll",isPlaylist);
            SetPlayList(prev => !prev)
          }}
          className='flex items-start'
        />
      </div>
      <div className='flex-1 w-full'>
        <AudioPlayer
          autoPlay={true}
          src={allSongs[PlayingIndex]?.songUrl}
           onPlay={e => console.log('onPlay')}
           showSkipControls={true}
        />
      </div>
      {isPlaylist && <PlaylistCard />}
    </div>
  )
}

export default MusicPlayer
