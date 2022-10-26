import React, { useContext, useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import {
  Header,
  DashBoardHome,
  DashBoardUser,
  DashBoardSongs,
  CreateSong,
  DashBoardArtist,
  DashBoardAlbum
} from './index'
import { AiFillHome } from 'react-icons/ai'
import { GetAllUser } from '../apiHelper/user'
import { Music_Context } from '../context'
import { GetAllAlbums } from '../apiHelper/album'
import { GetAllArtists } from '../apiHelper/artist'
function Dashboard () {
  const { GetAllUsers,GetAlbums,GetArtists } = useContext(Music_Context)
  useEffect(() => {
    GetAllUser(GetAllUsers)
    GetAllAlbums(GetAlbums)
    GetAllArtists(GetArtists)
  }, [])
  return (
    <div className='w-screen h-full flex flex-col gap-2'>
      <Header />
      {/* dashboard Nav */}
      <div className='w-screen h-auto py-2 flex items-center justify-center'>
        <div className='flex items-center gap-10 justify-center w-96 h-auto p-3 font-serif'>
          <NavLink
            to={'/dashboard/home'}
            className={({ isActive }) =>
              isActive
                ? 'text-black/70 font-semibold text-md'
                : 'text-black/50 text-sm font-normal'
            }
          >
            {' '}
            <AiFillHome />{' '}
          </NavLink>
          <NavLink
            to={'/dashboard/user'}
            className={({ isActive }) =>
              isActive
                ? 'text-black/70 font-semibold text-md'
                : 'text-black/50 text-sm font-normal'
            }
          >
            {' '}
            <p>User</p>{' '}
          </NavLink>
          <NavLink
            to={'/dashboard/song'}
            className={({ isActive }) =>
              isActive
                ? 'text-black/70 font-semibold text-md'
                : 'text-black/50 text-sm font-normal'
            }
          >
            <p>Songs</p>
          </NavLink>
          <NavLink
            to={'/dashboard/artist'}
            className={({ isActive }) =>
              isActive
                ? 'text-black/70 font-semibold text-md'
                : 'text-black/50 text-sm font-normal'
            }
          >
            {' '}
            <p>Artist</p>{' '}
          </NavLink>
          <NavLink
            to={'/dashboard/album'}
            className={({ isActive }) =>
              isActive
                ? 'text-black/70 font-semibold text-md'
                : 'text-black/50 text-sm font-normal'
            }
          >
            {' '}
            <p>Album</p>{' '}
          </NavLink>
        </div>
      </div>

      {/* ROUTES TO DASHBOARD NAV */}

      <div className='my-3 p-3 w-full'>
        <Routes>
          <Route path='/home' element={<DashBoardHome />}></Route>
          <Route path='/user' element={<DashBoardUser />}></Route>
          <Route path='/artist' element={<DashBoardArtist/>} ></Route>
          <Route path='/album' element={<DashBoardAlbum/>} ></Route>
          <Route path='/song' element={<DashBoardSongs deleteBtn={true} />}></Route>
          <Route path='/new-song' element={<CreateSong/>}>
            {' '}
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard
