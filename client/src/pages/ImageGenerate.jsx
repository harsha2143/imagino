import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext';
const ImageGenerate = () => {

  const [image, setImage] = React.useState(assets.sample_img_5);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const { generateImage } = useContext(AppContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (input) {
      const image = await generateImage(input)
      if (image) {
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1, delay: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit} className='flex flex-col min-h-[87vh] items-center justify-center gap-5'>
      <div>
        <div className='relative mt-20'>
          <img src={image} alt="" className='max-w-sm rounded' />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[1s]' : 'w-0'}`}
          ></span>
        </div>

        <p className={!loading ? 'hidden' : ''}>Loading.....</p>

      </div>
      {!isImageLoaded &&
        <div className='flex w-full max-w-xl bg-neutral-500 p-0.5 text-white rounded-full text-sm shadow-md'>
          <input onChange={e => setInput(e.target.value)} value={input}
            type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 p-2 placeholder-color' />
          <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full cursor-pointer'>Generate</button>
        </div>
      }
      {isImageLoaded &&
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 rounded-full mb-10'>
          <p onClick={() => setIsImageLoaded(false)} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
          <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
        </div>
      }
    </motion.form>
  )
}

export default ImageGenerate
