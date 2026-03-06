import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchSongs } from '../redux/slices/songSlice'

const SongsManagment = () => {
    const {user}=useSelector((state)=>state.auth)
    const {songs,loading,error}=useSelector((state)=>state.songs)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    useEffect(()=>{
      if(user&&user.data.role!=="admin"){
        navigate("/")
      }
    },[user,navigate])
    
    useEffect(()=>{
      if(user&&user.data.role==="admin"){
        dispatch(fetchSongs())
      }
    },[dispatch,user])
  return (
    <div>
      <h1 className='text-center text-5xl  underline font-bold mb-4'>Total Songs</h1>
      {loading && <p>Loading ...</p>}
      {error && <p>Error: {error}</p>}
      <div className='flex flex-col justify-center items-center px-2 gap-5'>
        {
            songs.map((song)=>(
                <div key={song._id} className='w-full flex justify-between items-center gap-3 rounded-lg p-2 h-24 bg-gray-200'>
                    <div className='h-full w-20  '>
                        <img src={song.coverImage} alt={song.title} className='w-20 h-20 rounded-lg'/>
                    </div>
                    <div className='h-full flex flex-col justify-start p-2 w-full'>
                        <p className='text-xl text-gray-800 font-semibold  '>{song.title}</p>
                        <p className='text-lg text-gray-600 font-semibold '>{song.artist}</p>
                    </div>

                </div>
            ))
        }
      </div>
    </div>
  )
}

export default SongsManagment
