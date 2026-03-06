import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSpotify } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import Search from '../pages/Search';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { MdClose } from "react-icons/md";
import { logout } from '../redux/slices/authSlice';
import { resetPlaylists } from '../redux/slices/playlistSlice';


const Navbar = () => {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const user=useSelector((state)=>state.auth?.user)
  const [openProfile,setOpenProfile]=useState(false)


  const handleProfileToggle=()=>{
    setOpenProfile(!openProfile)
  }
  
   
  const handleLogout=()=>{
    dispatch(logout())
    dispatch(resetPlaylists())
    navigate('/')
    setOpenProfile(!openProfile)
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-50 bg-black h-16 px-4 flex w-full justify-between items-center">

      {/* LEFT */}
      <div className="flex items-center gap-6">

        <Link to="/">
          <FaSpotify className="text-3xl text-white" />
        </Link>

        <Link
          to="/"
          className="bg-[#282828] rounded-full hover:scale-110 transition p-3"
        >
          <GoHomeFill className="text-2xl text-white" />
        </Link>

        <Search />
      </div>

      {/* RIGHT */}
      <div className="relative flex items-center gap-6">

          {user && user.data.role==="admin"&&(<Link to='/admin' className="bg-green-600 block px-2 py-1 rounded text-black">Admin</Link>)}
        

        <div className="flex items-center gap-4 pr-4 border-r border-white/20">
          <Link to="/premium" className="text-gray-300 hover:text-white font-semibold">
            Premium
          </Link>
          <Link to="/premium" className="text-gray-300 hover:text-white font-semibold">
            Support
          </Link>
        </div>
        <div className={`absolute top-0 -right-5 h-screen w-80 bg-black z-50 px-5 py-5 transition-transform transform duration-300  ${openProfile?'translate-x-0':'translate-x-full'}`}>
          <div className='relative flex items-center p-2'>
            <div  className='px-4'><p  className='text-lg px-4 text-black  font-semibold py-2 bg-green-600 rounded-full'>{ user && user.data &&user.data.name.split(' ')[0].split('')[0]}</p></div>
            <div className='flex flex-col '>
              <p className='text-lg font-bold'>{user && user.data &&  user.data.name}</p>
              <p className='text-xs text-gray-400'>{user && user.data &&  user.data.email}</p>
            <p className={`capitalize  ${user && user.data &&  user.data.role==='admin'?'text-red-500':'text-yellow-400'}`}>{user && user.data && user.data.role==='admin'?'admin 🥷🏻':'listener 🙎🏻‍♂️'}</p>

            </div>
          </div>
            <MdClose className=' absolute top-5 right-5 text-2xl' onClick={handleProfileToggle}/>
            <div className='w-full flex justify-center items-center mt-7' >
              <button onClick={handleLogout} className='bg-red-600 text-white px-4 py-2 rounded-lg'>Logout</button>
            </div>
        </div>
        {
          user?(<div  className='px-4'><button onClick={handleProfileToggle} className='text-lg px-4 text-black text-center font-semibold py-2 bg-green-600 rounded-full'>{user.data.name.split(' ')[0].split('')[0]}</button></div>):(<div className='flex gap-4 items-center'>
        <Link to="/signup" className="text-gray-300 hover:text-white font-semibold">
          Sign up
        </Link>

        <button
          onClick={handleLogin}
          className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold hover:scale-105 transition"
        >
          Log in
        </button>
        </div>)
        }
      </div>
    </nav>
  )
}

export default Navbar