import React, { useContext, useState } from 'react'
import { Music_Context } from '../context/index'
import { AiFillDelete } from 'react-icons/ai'
import moment from 'moment'
import { UpdateUser } from '../apiHelper/user'
function DashboardUser () {
  const { allUsers, user } = useContext(Music_Context).state
  const {UpdateUserRole}=useContext(Music_Context)
  const [clickRole, setClickRole] = useState(false)

const ChangeRole=(id,index,role)=>{
   UpdateUser(id,index,role,UpdateUserRole)
}

  const RoleSetUp = (data, userId) => {
    if (data._id !== userId) {
      if (data.role == 'admin') {
        return 'Member'
      } else {
        return 'Admin'
      }
    }
  }

  const DashBoard_UserCard = ({ data,index }) => {
    const createdAt = moment(new Date(data.createdAt)).format('MMMM Do YYYY')
    return (
      <div className='w-full h-auto '>
        <div className='flex items-center justify-start gap-4 p-2'>
          <div className='w-16 h-12 flex py-2 justify-center'>
            {data._id !== user._id && (
              <AiFillDelete className='text-red-400 text-lg' />
            )}
          </div>
          <div className='w-20 h-12 flex justify-start'>
            <img
              src={data.image_URL}
              className='flex w-10 h-10 object-cover'
              referrerPolicy='no-referrerPolicy'
            ></img>
          </div>
          <p className='w-44 h-12 border-b-[.01rem] border-black/20 flex'>
            {data.email}
          </p>
          <p className='w-36 h-12 max-w-36 border-b-[.01rem] border-black/20'>
            {data.name}
          </p>
          <p className='w-36 h-12 max-w-36 border-b-[.01rem] border-black/20'>
            {createdAt}
          </p>
          <p className='w-20 h-12 max-w-36 border-b-[.01rem] border-black/20'>
            {data.role}
          </p>

          <div className='w-20 h-12 flex flex-col items-center rounded-sm text-sm cursor-pointer'>
            <div
              className='bg-blue-200 px-1 text-[.6rem] mb-5 rounded-md'
              onClick={e => {
                e.preventDefault()
                setClickRole(data._id)
              }}
            >
              {RoleSetUp(data, user._id)}
            </div>
            <div
              className={`${
                data._id == clickRole ? 'block' : 'hidden'
              } w-36 h-auto my-1 bg-gray-200 relative left-7`}
            >
              <p className='text-[.7rem] font-semibold '>
                Are You Sure Do You Want To Mark as{' '}
                {data.role == 'admin' ? 'Member' : 'Admin'}
              </p>
              <div className='flex justify-between'>
                <button
                  className='bg-blue-300 rounded-sm p-1 text-sm'
                  onClick={e => {
                    e.preventDefault()
                    setClickRole(false)
                    ChangeRole(data._id,index,data.role == 'admin' ? 'member' : 'admin')
                  }}
                >
                  Yes
                </button>
                <button
                  className='bg-red-200 rounded-sm p-1 text-sm'
                  onClick={e => {
                    e.preventDefault()
                    setClickRole(false)
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-auto flex flex-col gap-1 p-4 px-3 py-2 my-3 font-serif text-sm'>
      <div className='flex items-center justify-start  gap-4 p-2'>
        <p className='w-16 py-1'></p>
        <p className='w-20 py-1 border-b-[.01rem] border-black/20'>Image</p>
        <p className='w-44 py-1 border-b-[.01rem] border-black/20'>Email</p>
        <p className='w-36 py-1 border-b-[.01rem] border-black/20'>Name</p>
        <p className='w-36 py-1 border-b-[.01rem] border-black/20'>CreatedAt</p>
        <p className='w-20 py-1 border-b-[.01rem] border-black/20'>Role</p>
        <p className='w-36 py-1'></p>
      </div>
      {allUsers && allUsers.map((user,index) => <DashBoard_UserCard data={user} index={index} />)}
    </div>
  )
}

export default DashboardUser
