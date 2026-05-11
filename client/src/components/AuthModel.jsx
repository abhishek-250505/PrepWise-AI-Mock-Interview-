import React from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/Auths';

function AuthModel({onClose}) {
    const {userData} = useSelector((state)=>state.user)

    useEffect(()=>{
        if(userData){
            onClose()
        }

    },[userData , onClose])

  return createPortal(
    <div className='fixed inset-0 z-9999 overflow-y-auto bg-black/40 backdrop-blur-sm px-4 py-6 sm:py-8'>
      <div className='flex min-h-full items-start justify-center sm:items-center'>
        <div className='relative w-full max-w-md max-h-[calc(100vh-3rem)] overflow-y-auto rounded-3xl sm:max-h-[calc(100vh-4rem)]'>
          <button onClick={onClose} className='absolute top-4 right-4 text-gray-800 hover:text-black text-xl z-10'>
            <FaTimes size={18} />
          </button>
          <Auth isModel={true} />
        </div>
      </div>
    </div>,
    document.body
  )
}

export default AuthModel
