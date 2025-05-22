import React from 'react'
import { assets } from '../assets/assets'

const Steps = () => {
  return (
    <div className='mx-4 lg:mx-44 py-20 xl:py-40'>
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 mb-4 border-15 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>
            Steps to remove background image in seconds
        </h1>
        <div className='flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center'>
        <div className='w-80 h-40 flex items-start gap-4 flex-col bg-white border drop-shadow-md p-7 rounded hover:scale-105 transition-all duration-500'>
            <div className='flex items-start gap-4'>
            <img className='w-9 h-9' src={assets.upload_icon} alt="" />
            <div>
                <p className='text-xl font-medium'>Upload image</p>
                <p className='text-sm text-neutral-500 mt-1'>
                Choose the image you want to remove the background from.
                </p>
            </div>
            </div>
        </div>

        <div className='w-80 h-40 flex items-start gap-4 flex-col bg-white border drop-shadow-md p-7 rounded hover:scale-105 transition-all duration-500'>
            <div className='flex items-start gap-4'>
            <img className='w-9 h-9' src={assets.remove_bg_icon} alt="" />
            <div>
                <p className='text-xl font-medium'>Remove Background</p>
                <p className='text-sm text-neutral-500 mt-1'>
                The background will be removed automatically with precision.
                </p>
            </div>
            </div>
        </div>

        <div className='w-80 h-40 flex items-start gap-4 flex-col bg-white border drop-shadow-md p-7 rounded hover:scale-105 transition-all duration-500'>
            <div className='flex items-start gap-4'>
            <img className='w-9 h-9' src={assets.download_icon} alt="" />
            <div>
                <p className='text-xl font-medium'>Download Image</p>
                <p className='text-sm text-neutral-500 mt-1'>
                Download your background-free image in just one click.
                </p>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Steps
