import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../config/firebase.config'
import { MdCloudDownload } from 'react-icons/md'
function FileCloud ({ type, setLoading, setImageCover, setProgress }) {
  const imageUploader = useRef()

  const handleImage = e => {
    const fileUploadFor = e.target.files[0]
    setLoading(true)
    // setUploadImage(e.target.files[0])
    console.log('image selected', e.target.files[0])
    //create reference
    const fileRef = ref(
      storage,
      `${type == 'Image' ? 'Images' : 'Audios'}/${Date.now()}-${
        fileUploadFor.name
      }`
    )

    const fileUploadTask = uploadBytesResumable(fileRef, fileUploadFor)
    fileUploadTask.on(
      'state_changed',
      snapshot => {
        setProgress(
          (Number(snapshot.bytesTransferred) / Number(snapshot.totalBytes)) *
            100
        )
        console.log('snap', snapshot.bytesTransferred)
      },
      error => {
        console.log(error)
      },
      () => {
        getDownloadURL(fileUploadTask.snapshot.ref).then(downloadUrl => {
          console.log('downloadLink', downloadUrl)
          setImageCover(downloadUrl)
        })
      }
    )
    setLoading(false)
  }
  return (
    <label
      onClick={() => {
        imageUploader.current.click()
      }}
    >
      <div className='w-full h-52 flex items-center justify-center'>
        <div className='flex flex-col gap-2'>
          <MdCloudDownload className='text-gray-600 text-2xl ' />
          <p className='text-gray-600 text-base font-semibold'>{`Click Here To Upload ${type}`}</p>
        </div>
      </div>
      <input
        type='file'
        className='w-full hidden'
        ref={imageUploader}
        accept={`${
          type == 'Image'
            ? 'image/*,image/jpeg,image/png'
            : '.mp3,audio/*,audio/mpeg'
        }`}
        onChange={e => {
          e.preventDefault()
          handleImage(e)
        }}
      />
    </label>
  )
}

export default FileCloud
