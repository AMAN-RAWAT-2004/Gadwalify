import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { FaUser , FaStore, FaSignOutAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { IoMusicalNotesSharp } from "react-icons/io5";

const AdminSidebar = () => {
  const dispatch=useDispatch()
    const navigate = useNavigate()
    const handleLogout=()=>{
      dispatch(logout())
      navigate('/')
    }
  return (
    <div className='p-6'>
      <div className="mb-6">
        <Link to='/admin' className='text-3xl  text-white font-semibold'>
            Gadwalify
        </Link>
      </div>
      <h2 className="text-xl text-white font-medium mb-6 underline text-center">Admin Dashboard</h2>

      <nav className='flex flex-col space-y-2'>
        <NavLink to='/admin/users' className={({isActive})=>isActive ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2':'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2'}>
        <FaUser/>
        <span>Users</span>
        </NavLink>
        <NavLink to='/admin/songs' className={({isActive})=>isActive ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2':'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2'}>
        <IoMusicalNotesSharp/>
        <span>Songs</span>
        </NavLink>
        <NavLink to='/admin/addSongs' className={({isActive})=>isActive ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2':'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2'}>
        <IoMusicalNotesSharp/>
        <span>Add Songs</span>
        </NavLink>
        <NavLink to='/' className={({isActive})=>isActive ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2':'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2'}>
        <FaStore/>
        <span>Explore</span>
        </NavLink>
        
        
      </nav>
            <div className='mt-6'>
                <button onClick={handleLogout} className='w-30 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded flex items-center justify-between space-x-2'>
                    <FaSignOutAlt className='text-lg'/>
                    <span>Logout</span>
                </button>
            </div>
    </div>
  )
}

export default AdminSidebar
