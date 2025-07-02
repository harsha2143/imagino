import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const imageArray = [
  assets.sample_img_1,
  assets.sample,
  assets.sample_img_2,
  assets.sample_img_4,
  assets.sample_img_3,
  assets.sample_img_6,
];
const Header = () => {

  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (user) {
      navigate('/generate');
    } else {
      setShowLogin(true);
    }

  }
  return (
    <motion.div className='flex flex-col items-center justify-center text-black'
      initial={{ opacity: 0.2, y: 100 }}
      animate={{ opacity: 0.8, y: 0 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-netural-500 mt-40'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <p>Best Text to Image Generator</p>
        <img src={assets.star_icon} alt="Logo" />
      </motion.div>
      <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
      >Turn text to <span className='text-blue-600'>image</span>, in seconds.</motion.h1>
      <motion.p className='text-center max-w-xl mx-auto mt-5'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.</motion.p>
      <motion.button onClick={onClickHandler}
        className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full cursor-pointer'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}

      >Generate Images
        <img className="h-6" src={assets.star_group} alt="" />
      </motion.button>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className='flex flex-wrap justify-center mt-16 gap-3'>
        {imageArray.map((imgSrc, index) => (
          <motion.img
            whileHover={{ scale: 1.05, duration: 0.3 }}
            className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
            src={imgSrc}
            alt={`Sample ${index + 1}`}
            key={index}
            width={70}
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className='mt-2 text-netural-600'>Generated images from imagify</motion.div>
    </motion.div>
  )
}

export default Header
