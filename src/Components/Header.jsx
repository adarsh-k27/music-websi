import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiFillCrown } from 'react-icons/ai'
import { logo } from '../IMG'
import { Music_Context } from '../context'
import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { motion } from 'framer-motion'
function Header () {
  const Navigate = useNavigate()
  const { user } = useContext(Music_Context).state
  const Logout = () => {
    const firebaseAuth = getAuth(app)
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem('auth', false)
      })
      .catch(error => {
        console.log(error)
      })
    Navigate('/login')
  }
  return (
    <div className='w-full h-auto p-4 flex items-center gap-16 md:px-8 md:py-0 bg-black/20 text-black/60 font-medium text-base font-serif'>
      <NavLink to={'/'}>
        {' '}
        <img
          src={logo}
          alt='image for logo'
          className='w-16 h-10 object-cover '
        />{' '}
      </NavLink>

      <ul className='w-full h-full flex flex-row items-center gap-10 leading-8'>
        <li>
          {' '}
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive
                ? 'text-black/60 font-semibold text-md'
                : 'text-black/50 text-base font-normal'
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          {' '}
          <NavLink
            to={'/music'}
            className={({ isActive }) =>
              isActive
                ? 'text-black/60 font-semibold text-md'
                : 'text-black/50 text-base font-normal'
            }
          >
            Music
          </NavLink>
        </li>
        <NavLink
          to={'/Premium'}
          className={({ isActive }) =>
            isActive
              ? 'text-black/60 font-semibold text-md'
              : 'text-black/50 text-base font-normal'
          }
        >
          Premium
        </NavLink>
        <li>
          {' '}
          <NavLink
            to={'/contact'}
            className={({ isActive }) =>
              isActive
                ? 'text-black/60 font-semibold text-md'
                : 'text-black/50 text-base font-normal'
            }
          >
            Contact
          </NavLink>{' '}
        </li>
      </ul>

      <div className='group h-full flex gap-3 items-center cursor-pointer'>
        <img
          src={user?.image_URL}
          alt='user profile'
          className='object-cover w-16 h-10'
        />
        <div className='flex flex-col py-3 relative'>
          <p className='text-black/50 text-sm font-normal'>{user?.name}</p>
          <p className='flex gap-1 text-[.7rem] py-1  items-center text-black/40'>
            premium
            <span>
              {' '}
              <AiFillCrown className='text-yellow-400' />{' '}
            </span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          className='hidden group-hover:block absolute top-[3.5rem] right-20 px-6 py-5 h-auto w-52   flex-col gap-2 items-center '
        >
          <div className='bg-white/70 shadow-lg py-3 flex flex-col items-center'>
            <NavLink to={'/profile'}>
              <p className='text-black/70 hover:text-black/50 cursor-pointer py-1'>
                Favourites
              </p>
            </NavLink>
            <NavLink>
              <p className='text-black/70 hover:text-black/50 cursor-pointer py-1'>
                Profile
              </p>
            </NavLink>
            {user?.role == 'admin' && (
              <NavLink to={'/dashboard/home'}>
                <p className='text-black/70 hover:text-black/50 cursor-pointer py-1'>
                  Dashboard
                </p>
              </NavLink>
            )}
            <p
              onClick={Logout}
              className='text-black/70 hover:text-black/50 cursor-pointer py-1'
            >
              LogOut
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Header
