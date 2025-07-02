import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios'

const Login = () => {

    const [state, setState] = useState('Login');
    const { setShowLogin, backendUrl,setToken ,setUser} = useContext(AppContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const SubmitHandler = async (e) => {
        e.preventDefault(); 
        try{
            if(state === 'Login'){
                const {data}=await axios.post(backendUrl+'/api/users/login',{email,password})
                if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token',data.token)
                    setShowLogin(false)
                }else{
                    toast.error(data.message)
                }
            }else{
                
                const {data} =  await axios.post(backendUrl+'/api/users/register',{name,email,password})
                if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token',data.token)
                    setShowLogin(false)
                }else{
                    toast.error(data.message)
                }
            }
            
        }catch(err){
            toast.error(err.message)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset'; // Reset overflow when component unmounts
        };
    }, []);

    return (

        <div className='fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <div className='relative'>
                <motion.img
                    initial={{ opacity: 0.2, y: 100 }}
                    transition={{ duration: 0.6, }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => setShowLogin(false)}
                    src={assets.cross_icon}
                    alt="close"
                    className='absolute top-4 right-4 w-4 h-3 cursor-pointer'
                />
                <motion.form onSubmit={SubmitHandler}
                    initial={{ opacity: 0.2, y: 50 }}
                    transition={{ duration: 0.6, }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='bg-white p-8 rounded-xl shadow-lg w-[320px] sm:w-[400px]'>
                    <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
                    <p className='mb-4 text-sm text-gray-600'>Welcome back! Please sign in to continue</p>

                    {state !== 'Login' && (
                        <div className='flex px-6 py-2 gap-2 items-center border rounded-full mt-4'>
                            <img src={assets.profile_icon} alt="" className='w-5 h-5' />
                            <input onChange={(e) => setName(e.target.value)} value={name} className='outline-none text-sm' type="text" placeholder='Full Name' required />
                        </div>
                    )}

                    <div className='flex px-6 py-2 gap-2 items-center border rounded-full mt-4'>
                        <img src={assets.email_icon} alt="" />
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='outline-none text-sm' type="email" placeholder='Email Id' required />
                    </div>

                    <div className='flex px-6 py-2 gap-2 items-center border rounded-full mt-4'>
                        <img src={assets.lock_icon} alt="" />
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='outline-none text-sm' type="password" placeholder='Password' required />
                    </div>

                    <p className='text-sm text-blue-500 my-4 cursor-pointer'>Forgot Password?</p>
                    <button className='bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer'>
                        {state === 'Login' ? 'Login' : 'Create Account'}
                    </button>

                    {state === 'Login' ? (
                        <p className='mt-5 text-center'>
                            Don't have an account?{' '}
                            <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign up</span>
                        </p>
                    ) : (
                        <p className='mt-5 text-center'>
                            Already have an account?{' '}
                            <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span>
                        </p>
                    )}
                </motion.form>
            </div>
        </div>

    );
};

export default Login;
