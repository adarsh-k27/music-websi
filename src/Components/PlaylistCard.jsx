import React from 'react'
import { useContext } from 'react'
import { Music_Context } from '../context'
import { RiMusicFill } from 'react-icons/ri'
function PlaylistCard () {
  const { allSongs, PlayingIndex, Playing } = useContext(Music_Context).state
  const { SetPlaying, SetPlayingIndex } = useContext(Music_Context)
  const SetPlayList = index => {
    if (!Playing) {
      SetPlaying(true)
    }
    if (PlayingIndex !== index) {
      SetPlayingIndex(index)
    }
  }
  
  return (
    <div className='absolute -bottom-20 left-5 bg-white/75 overflow-y-scroll flex flex-col gap-1 w-[350px] max-w-[350px] h-[450px] max-h-[450px]'>
      {allSongs &&
        allSongs.map((song, index) => (
          <div
            className={`group w-full flex gap-3 items-center cursor-pointer bg-transparent ${
              PlayingIndex == index ? 'text-blue-400' : 'text-black/50'
            }`}
            onClick={SetPlayList(index)}
          >
            <RiMusicFill />
            <div className='flex items-start flex-col'>
              <p>
                {song.name?.length > 20 ? song.name.splice(0, 20) : song.name}
                <span>{`(${song.album && song.album})`}</span>
              </p>
              <p>
                {song.artist && song.artist}
                <span>{`(${song?.catogery})`}</span>
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default PlaylistCard
