import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Upload = () => {

  const { removeBg } = useContext(AppContext)

  const convertToWebP = (file, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0)

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const webpFile = new File([blob], 'converted.webp', { type: 'image/webp' })
                resolve(webpFile)
              } else {
                reject(new Error('WebP conversion failed'))
              }
            },
            'image/webp',
            quality
          )
        }
        img.src = event.target.result
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleFileChange = async (file) => {
    if (!file) return
    try {
      const webpFile = await convertToWebP(file, 0.8)
      console.log(
        `Original: ${(file.size / 1024).toFixed(2)} KB → WebP: ${(webpFile.size / 1024).toFixed(2)} KB`
      )
      removeBg(webpFile)
    } catch (err) {
      console.error('Conversion error:', err)
      removeBg(file)
    }
  }

  return (
    <div>
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 mb-4 border-15 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6 md:py-16'>
            See the magic. Try now.
        </h1>
        <div className='text-center mb-24'>
            <input onChange={ e => handleFileChange(e.target.files[0])} type="file" accept='image/*' id="upload2" hidden />
            <label className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-poinnter bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700 cursor-pointer' htmlFor="upload2">
                <img width={20} src={assets.upload_btn_icon} alt="" />
                <p className='text-white text-sm'>Upload your image</p>
            </label>
        </div>
    </div>
  )
}

export default Upload
