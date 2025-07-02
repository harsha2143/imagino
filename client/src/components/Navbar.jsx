import React,{useContext} from 'react'
import {assets} from '../assets/assets'
import { Link,useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Navbar = () => {
    
    const {user,setShowLogin,logout,credit} = useContext(AppContext);
    const navigate = useNavigate();
    
  return (
    <div className='flex fixed top-0 right-30 left-30 justify-between items-center min-w-[100vh] py-2 px-6 sm:px-10 md:px-14 lg:px-8 bg-gradient-to-b from-teal-50 to-gray-50  shadow-lg rounded-full'>
        <Link to="/" className="flex items-center gap-2">
           <img src={assets.logo} alt="Logo" className="w-28 sm:w-32 lg:w-40" />
        </Link>
        <div>
            {user ? <div className='flex  items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10'>
                <button onClick={()=>navigate('/buy')} className='flex items-center rounded-full bg-blue-300 px-4 sm:px-6 py-1.5 sm:py-3 hover:scale-105 transition-all duration-700'>
                    <img src={assets.credit_star} alt="User" className='w-5 sm:w-5 lg:w-5 mr-2' />
                    <p className='text-xs sm:text-sm font-medium text-black cursor-pointer'>Credits left : {credit}</p>
                </button>
                <p className='text-gray-600 max-sm:hidden pl-4'>Hi,{user.name}</p>
                <div className='relative group'>
                    <img src={assets.profile_icon} alt="Profile" className='w-10 sm:w-10 lg:w-12  drop-shadow cursor-pointer' />   
                    <div className='absolute top-12 right-0 z-10 bg-white shadow-lg rounded px-8 py-2 hidden group-hover:block'>
                        <ul className='cursor-pointer'>
                            <li onClick={logout}>Logout</li>
                        </ul>
                    </div>
                </div>
            </div> 
            :
            <div className='flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10'>
                <p onClick={()=>navigate('/buy')} className='cursor-pointer px-8 py-2 rounded-full hover:shadow-lg'>Pricing</p>
                <button onClick={()=>setShowLogin(true)} className='bg-teal-500 text-sm text-white px-7 py-2 sm:px-10  rounded-full hover:bg-teal-600 transition duration-300'>
                    Login
                </button>
            </div>
            }
        </div>
    </div>
  )
}

export default Navbar
