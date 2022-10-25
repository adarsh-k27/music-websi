import React, { useContext, useState } from 'react'
import { Catogery, Languages } from '../utils/filterData'
import FilterBox from './FilterBox'
import { Music_Context } from '../context/index'
import FileCloud from './FileCloud'
import { MdDelete } from 'react-icons/md'
import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../config/firebase.config'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SaveAlbum } from '../apiHelper/album'
import { SaveArtist } from '../apiHelper/artist'
import { SaveSong } from '../apiHelper/song'

function CreateSong () {
  const {
    allAlbums,
    allArtists,
    albumFiter,
    artistFilter,
    languageFilter,
    catogeryFilter
  } = useContext(Music_Context).state
  const { AlbumSave, ArtistSave, SongLength } = useContext(Music_Context)
  const [songName, setSongName] = useState('')
  const [Loading, setLoading] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const [artistLoading, setArtistLoading] = useState(false)
  const [imageCover, setImageCover] = useState(null)
  const [audioUrl, setAudioUrl] = useState(false)
  const [artistCover, setArtistCover] = useState(null)
  const [progress, setProgress] = useState(8.75)
  const [audioProgress, setAudioProgress] = useState(0)
  const [albumProgress, setAlbumProgress] = useState(10)
  const [artistName, setArtistName] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [albumName, setAlbumName] = useState('')
  const [albumCover, setAlbumCover] = useState('')
  const [albumLoading, setAlbumLoading] = useState(false)

  const [saveSongButtonLoad, setSaveSongBtn] = useState(false)
  const [saveArtistButtonLoad, setSaveArtistBtn] = useState(false)
  const [saveAlbumButtonLoad, setSaveAlbumBtn] = useState(false)
  console.log('allallll', allAlbums)

  
  const handleInputText = (e, state) => {
    e.preventDefault()
    state(e.target.value)
  }

  const handleDelete = (url, isImage) => {
    if (isImage) {
      setLoading(true)
    } else {
      setAudioLoading(true)
    }
    const deleteRef = ref(storage, url)
    deleteObject(deleteRef).then(() => {
      setImageCover(false)
      setAudioUrl(false)
      setLoading(false)
      setAudioLoading(false)
    })
  }

  const handleSaveAlbum = () => {
    //console.log("cclllclkldj");
    setSaveAlbumBtn(true)
    const data = { name: albumName, image: albumCover }
    SaveAlbum(data, AlbumSave, setSaveAlbumBtn)
  }

  const handleSaveArtist = () => {
    setSaveArtistBtn(true)
    const data = { name: artistName, image: artistCover, twitter, instagram }
    SaveArtist(data, ArtistSave, setSaveArtistBtn)
  }

  const handleSaveSong = () => {
    setSaveSongBtn(true)
    const data = {
      name: songName,
      image: imageCover,
      songUrl: audioUrl,
      albumId: albumFiter._id,
      artistId: artistFilter._id,
      language: languageFilter,
      catogery: catogeryFilter
    }
    console.log("songData",data);
    SaveSong(data, SongLength, setSaveSongBtn)
  }

  return (
    <div className='w-screen h-full my-2 px-2 flex flex-col bg-white/20 gap-1 justify-start'>
      {/* Song Name Input creation */}
      <div className='w-64 h-auto px-2 py-2 rounded-md'>
        <input
          type='text'
          name=''
          id=''
          placeholder='Type Song Name Here..'
          onChange={e => {
            handleInputText(e, setSongName)
          }}
          className='focus:border-black/20 border-solid border-2 rounded-md text-xs font-serif font-semibold '
        />
      </div>
      {/* Filter Box Creation  */}
      <div className='w-full h-auto  my-1 flex  flex-wrap justify-between px-3'>
        <FilterBox flag={'Artists'} menuData={allArtists} />
        <FilterBox flag={'Albums'} menuData={allAlbums} />
        <FilterBox flag={'Language'} menuData={Languages} />
        <FilterBox flag={'Catogery'} menuData={Catogery} />
      </div>
      {/* Image And Audio Selecter For Song */}
      <div className='grid grid-cols-2  gap-3 w-full h-auto'>
        <div className='flex flex-col gap-2 py-4 px-2 bg-white/100 shadow-xl shadow-black/20'>
          <p className='w-full flex py-1 items-center justify-center text-sm font-serif font-normal'>
            Song creation
          </p>

          <div className='block md:flex flex-row gap-1 justify-between px-1'>
            <div className='w-auto h-auto px-3 py-1 border-2 border-black/20 border-dotted'>
              <>
                {Loading && <FileLoader progress={progress} />}
                {!Loading && (
                  <>
                    {!imageCover ? (
                      <FileCloud
                        type={'Image'}
                        setLoading={setLoading}
                        setImageCover={setImageCover}
                        setProgress={setProgress}
                      />
                    ) : (
                      <div className='w-full h-full relative overflow-hidden '>
                        <img
                          src={imageCover && imageCover}
                          alt='image cover '
                          className='w-full h-full object-cover'
                        />
                        <button
                          type={'button'}
                          onClick={e => {
                            e.preventDefault()
                            handleDelete(imageCover, true)
                          }}
                          className='absolute bottom-3 right-3 p-3 rounded-md bg-red-500 text-xl text-white/50 hover:bg-red-300 transition-all ease-out duration-100'
                        >
                          <MdDelete className='text-xl text-white/50' />
                        </button>
                      </div>
                    )}{' '}
                  </>
                )}
              </>
            </div>
            {/* for audio selecter */}
            <div className='w-auto h-auto px-3 py-3 border-2 border-black/20 border-dotted'>
              <>
                {audioLoading && <FileLoader progress={progress} />}
                {!audioLoading && (
                  <>
                    {' '}
                    {!audioUrl ? (
                      <FileCloud
                        type={'Audio'}
                        setLoading={setAudioLoading}
                        Loading={audioLoading}
                        setImageCover={setAudioUrl}
                        setProgress={setAudioProgress}
                      />
                    ) : (
                      <div className='w-full flex flex-col gap-1 h-full relative overflow-hidden '>
                        <audio src={audioUrl} controls className='relative' />
                        <button
                          type={'button'}
                          onClick={e => {
                            e.preventDefault()
                            handleDelete(audioUrl, false)
                          }}
                          className='absolute bottom-2 right-3 p-3 rounded-md bg-red-500 text-xl text-white/50 hover:bg-red-300 transition-all ease-out duration-100'
                        >
                          <MdDelete className='text-xl text-white/50' />
                        </button>
                      </div>
                    )}{' '}
                  </>
                )}
              </>
            </div>
          </div>

          <div className='flex w-full md:w-56 md:ml-16 items-center justify-center p-1 text-sm font-normal font-serif'>
            {!imageCover && !audioUrl ? (
              <button
                type='button'
                class='text-white bg-orange-400  cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                disabled=''
              >
                Save Song
              </button>
            ) : (
              <button
                type='button'
                onClick={e => {
                  handleSaveSong()
                }}
                class='text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center'
              >
                {saveSongButtonLoad && (
                  <svg
                    aria-hidden='true'
                    role='status'
                    class='inline mr-3 w-4 h-4 text-white animate-spin'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='#E5E7EB'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentColor'
                    />
                  </svg>
                )}
                Save Song
              </button>
            )}
          </div>
        </div>

        {/* Artist Creation */}
        <div className='flex flex-col py-4 px-2 gap-1 w-full h-full  bg-white/60 shadow-xl shadow-black/20 '>
          <p className='w-full flex py-1 items-center justify-center text-sm font-serif font-normal text-orange-400'>
            Artist Creation
          </p>
          <div className='block md:flex flex-row gap-2 mb-3 justify-between'>
            {/* artist image */}
            <div className='w-[50%] h-auto px-3 py-2 border-2 border-black/20 border-dotted'>
              <>
                {artistLoading && <FileLoader progress={progress} />}
                {!artistLoading && (
                  <>
                    {!artistCover ? (
                      <FileCloud
                        type={'Image'}
                        setLoading={setArtistLoading}
                        setImageCover={setArtistCover}
                        setProgress={setProgress}
                      />
                    ) : (
                      <div className='w-full h-full relative overflow-hidden '>
                        <img
                          src={artistCover && artistCover}
                          alt='image cover '
                          className='w-full h-full object-cover'
                        />
                        <button
                          type={'button'}
                          onClick={e => {
                            e.preventDefault()
                            handleDelete(artistCover, true)
                          }}
                          className='absolute bottom-3 right-3 p-3 rounded-md bg-red-500 text-xl text-white/50 hover:bg-red-300 transition-all ease-out duration-100'
                        >
                          <MdDelete className='text-xl text-white/50' />
                        </button>
                      </div>
                    )}{' '}
                  </>
                )}
              </>
            </div>
            <div className='w-full flex flex-col gap-2 items-center justify-center'>
              <div className='w-full  p-1 py-2 text-sm font-serif shadow-lg shadow-white/20'>
                <input
                  type='text'
                  name=''
                  id=''
                  placeholder='Name Of Artist'
                  onChange={e => {
                    handleInputText(e, setArtistName)
                  }}
                  className='w-full '
                />
              </div>
              <div className='w-full  p-1 py-2 text-md font-serif shadow-lg shadow-white/20'>
                <input
                  type='text'
                  name=''
                  id=''
                  placeholder='Twitter '
                  onChange={e => {
                    handleInputText(e, setTwitter)
                  }}
                  className='w-full'
                />
              </div>
              <div className='w-full p-1 py-2 text-md font-serif shadow-lg shadow-white/20'>
                <input
                  type='text'
                  name=''
                  id=''
                  placeholder='Instagram'
                  onChange={e => {
                    handleInputText(e, setInstagram)
                  }}
                  className='w-full'
                />
              </div>
            </div>
          </div>

          <div className='flex w-full md:w-56 md-ml-16 items-center justify-center p-1 text-sm font-normal font-serif'>
            {!artistCover && !artistName ? (
              <button
                type='button'
                class='text-white bg-orange-400  cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                disabled=''
              >
                Save Artist
              </button>
            ) : (
              <button
                type='button'
                onClick={e => {
                  handleSaveArtist()
                }}
                class='text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center'
              >
                {saveArtistButtonLoad && (
                  <svg
                    aria-hidden='true'
                    role='status'
                    class='inline mr-3 w-4 h-4 text-white animate-spin'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='#E5E7EB'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentColor'
                    />
                  </svg>
                )}
                Save Artist
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Album Selecter */}
      <div className='flex flex-col gap-2  bg-white/60 shadow-xl shadow-black/20'>
        <p className='w-full flex py-1 items-center justify-center text-sm font-serif font-normal'>
          Album creation
        </p>

        <div className='block md:flex flex-row gap-4 items-center justify-center '>
          <div className='w-auto h-auto px-3 py-3 border-2 border-black/20 border-dotted'>
            <>
              {albumLoading && <FileLoader progress={progress} />}
              {!albumLoading && (
                <>
                  {' '}
                  {!albumCover ? (
                    <FileCloud
                      type={'Image'}
                      setLoading={setAlbumLoading}
                      setImageCover={setAlbumCover}
                      setProgress={setAlbumProgress}
                    />
                  ) : (
                    <div className='w-full flex flex-col gap-1 h-full relative overflow-hidden '>
                      <img
                        src={albumCover}
                        className='relative w-full h-full'
                      />
                      <button
                        type={'button'}
                        onClick={e => {
                          e.preventDefault()
                          handleDelete(albumCover, true)
                        }}
                        className='absolute bottom-2 right-3 p-3 rounded-md bg-red-500 text-xl text-white/50 hover:bg-red-300 transition-all ease-out duration-100'
                      >
                        <MdDelete className='text-xl text-white/50' />
                      </button>
                    </div>
                  )}{' '}
                </>
              )}
            </>
          </div>
          <div className='flex flex-col gap-1 text-sm font-serif'>
            <input
              type='text'
              onChange={e => handleInputText(e, setAlbumName)}
              name=''
              id=''
              placeholder='Album Name'
              className='w-full '
            />
          </div>
        </div>

        <div className='flex w-full md:w-56 md-ml-16 items-center justify-center p-1 text-sm font-normal font-serif'>
          {!albumCover && !albumName ? (
            <button
              type='button'
              class='text-white bg-orange-400  cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              disabled=''
            >
              Save Album
            </button>
          ) : (
            <button
              type='button'
              onClick={e => {
                handleSaveAlbum()
              }}
              class='text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center'
            >
              {saveAlbumButtonLoad && (
                <svg
                  aria-hidden='true'
                  role='status'
                  class='inline mr-3 w-4 h-4 text-white animate-spin'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='#E5E7EB'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentColor'
                  />
                </svg>
              )}
              Save Album
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export const FileLoader = ({ progress }) => {
  return (
    <div className='w-full h-36 flex items-center justify-center'>
      <div>
        <p>Loading...</p>
        <p>{progress} %</p>
      </div>
    </div>
  )
}

export default CreateSong
