import React from 'react'
import { MdDelete } from 'react-icons/md'
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai'
import { useState } from 'react'
import { DeleteAlbum } from '../apiHelper/album'
import { DeleteArtist } from '../apiHelper/artist'
import { DeleteSong } from '../apiHelper/song'
import { Music_Context } from '../context'
import { useContext } from 'react'

function SongCard ({ type, data, deleteBtn,index }) {
  const [isDelete, setDelete] = useState(false)
  const { AlbumDeleted, ArtistDeleted, SongDeleted,SetPlaying,SetPlayingIndex } = useContext(Music_Context)
  const {Playing,PlayingIndex}=useContext(Music_Context).state
  const handleDeleteItems = id => {
    if (type == 'song') {
      //delete song function
      return DeleteSong(id, SongDeleted)
    }
    if (type == 'artist') {
      //delete artists
      return DeleteArtist(id, ArtistDeleted)
    }
    if (type == 'album') {
      //delete Albums
      return DeleteAlbum(id, AlbumDeleted)
    }
  }

  const handlePlayingSong=()=>{
    
    if(Playing==false){
      SetPlaying(true)
    }
    if(PlayingIndex !== index){
       SetPlayingIndex(index)
    }
    
  }

  return (
    <div className='relative w-40 py-2 min-w-[210px] cursor-pointer bg-gray-100 flex flex-col gap-2 shadow-md border-black/5 border-solid border-2 justify-center items-center'
    onClick={(e)=>{
       e.preventDefault()
       type=="song" && handlePlayingSong()
      
    }}
    >
      <div className='w-40 min-w-[160px] h-40 min-h-[160px rounded-lg drop-shadow-lg overflow-hidden'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/AR_Rahman_At_The_%E2%80%98Marvel_Anthem%E2%80%99_Launch.jpg/330px-AR_Rahman_At_The_%E2%80%98Marvel_Anthem%E2%80%99_Launch.jpg'
          alt=''
          className='w-36 min-w[9rem] h-40 min-h-[10rem] object-cover'
        />
      </div>

      <p className='text-xs font-serif'>{data ? data.name : 'Song name'}</p>
      {type == 'song' && <p className='text-xs font-serif'>Song Name</p>}

      {type == 'artist' && (
        <div className='flex w-full flex-row gap-3 items-center justify-center'>
          <p className='p-1 bg-white shadow-sm shadow-black/25'>
            <a href=''>
              <AiFillInstagram className='text-sm text-red-500' />
            </a>
          </p>
          <p className='p-1 bg-white shadow-sm shadow-black/25'>
            <a href=''>
              <AiFillTwitterCircle className='text-sm text-blue-600' />
            </a>
          </p>
        </div>
      )}
      {deleteBtn && (
        <div
          className='group py-1 px-1 flex ml-auto rounded-sm shadow-sm shadow-black/25 '
          onClick={() => {
            setDelete(true)
          }}
        >
          <button type={'button'}>
            <MdDelete className='group-hover:text-red-600 text-md text-red-400' />
          </button>
        </div>
      )}
      {isDelete && (
        <div className='absolute inset-0 backdrop-blur-sm bg-white/5 flex flex-col items-center justify-center gap-2'>
          <p className='text-[.6rem] font-normal font-serif text-dark'>
            Are You Sure You Want To Delete This ?
          </p>
          <div className='flex justify-between flex-row gap-4'>
            <button
              onClick={e => {
                e.preventDefault()
                handleDeleteItems(data._id)
              }}
              className='p-1 bg-red-600 text-sm'
            >
              Yes
            </button>

            <button
              className='p-1 bg-green-500 text-sm'
              onClick={() => {
                setDelete(false)
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SongCard
