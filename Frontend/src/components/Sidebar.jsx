import React, { useState } from 'react'
import { GoPlus } from "react-icons/go";
import { FiGlobe } from "react-icons/fi";
import { PiMusicNotesPlusFill } from "react-icons/pi";
import { FaRegFolder } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createMyPlaylist, fetchMyPlaylists } from '../redux/slices/playlistSlice';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [playlistBtn,setPlaylistBtn]=useState(false)
    const [createPlaylist,setCreatePlaylist]=useState(false)
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')

    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.auth)
    const {playlists,loading,error}=useSelector((state)=>state.playlist)
    useEffect(()=>{
      if(user){
        dispatch(fetchMyPlaylists())
      }
    },[user,dispatch])

    const handlePlaylistMenuToggle=()=>{
        setPlaylistBtn(!playlistBtn)

    }
    const togglePlaylistForm=()=>{
          setCreatePlaylist(!createPlaylist)
        setPlaylistBtn(false)

    }
    const handleSubmitPlaylistData=()=>{

        dispatch(createMyPlaylist({name,description})).unwrap()
    }
    const handleSubmitPlaylistDefaultData=()=>{
      dispatch(createMyPlaylist({name:'My-Playlist',description:'Description'})).unwrap()
    }
  return (
    <div className="bg-[#121212] h-full w-full flex flex-col gap-10 px-3 py-3 rounded-lg">

      {/* UP PART */}
      <div className="relative flex justify-between items-center p-3">
        <p className="text-white font-semibold">Your Library</p>

        <button onClick={handlePlaylistMenuToggle} className="bg-[#2A2A2A]  flex items-center rounded-3xl gap-2 font-semibold text-sm text-white px-4 py-2">
          <GoPlus className={`text-2xl text-[#ECECEC] transition-all duration-150  ${playlistBtn?'rotate-45':'rotate-0'}`} />
          Create
        </button>
        <div className={` top-15 -right-40 bg-[#282828] w-70 h-35 p-2 transition-all transform duration-300 rounded-lg ${playlistBtn ? 'absolute':'hidden' } `}>
            <div onClick={togglePlaylistForm} className='w-65 group flex flex-row justify-between items-center gap-5 h-15 rounded-lg px-3 p-1 transition-all duration-300 hover:bg-[#3E3E3E] '>
                <div    className='bg-[#525252] rounded-full p-2'>
                    <PiMusicNotesPlusFill className='text-3xl transition-all transform duration-300 group-hover:rotate-12 group-hover:text-green-500   '/>
                </div>
                <div>
                  <p className='text-[16px] font-semibold'>Playlist</p>
                  <p className='text-sm text-[#B3B3B3]'>Create a playlist with songs</p>  
                </div>
                
            </div>
            <div onClick={handleSubmitPlaylistDefaultData} className='w-65 group flex flex-row  items-center gap-5 h-15 rounded-lg px-3 p-1 transition-all duration-300 hover:bg-[#3E3E3E] '>
                <div className='bg-[#525252] rounded-full p-3'>
                    <FaRegFolder  className='text-2xl transition-all transform duration-300 group-hover:rotate-12 group-hover:text-green-500   '/>
                </div>
                <div>
                  <p className='text-[16px] font-semibold'>Folder</p>
                  <p className='text-sm text-[#B3B3B3]'>Organize your playlists</p>  
                </div>
                
            </div>
            
            
         </div>
         {/* CREATE PLAYLIST FORM  */}
          <div className={`absolute p-5 top-5 -right-180 transition transform duration-300 bg-[#282828] w-180 h-130  rounded-lg ${createPlaylist ? 'block':'hidden'} `}>
                  <GoPlus onClick={togglePlaylistForm} className='rotate-45 hover:text-gray-400 cursor-pointer text-3xl ' />

                  <form onSubmit={handleSubmitPlaylistData} className='w-full flex flex-col gap-5 justify-center  ' >
                    <h1 className='text-center text-2xl uppercase font-bold mb-5'>Create your playlist</h1>
                    <div className='flex flex-col gap-2 px-5  '>
                      <label className='text-xs uppercase'>Playlist name</label>
                      <input type="text" className='border w-full text-white p-2 text-sm rounded-lg' value={name}  placeholder='playlist name...' onChange={(e)=>setName(e.target.value||'My Playlist')} />
                    </div>
                    <div className='flex flex-col gap-2 px-5  '>
                      <label className='text-xs uppercase'>Description</label>
                      <textarea rows={4} className='border w-full text-white p-2 text-sm rounded-lg'  value={description} placeholder='playlist description...' onChange={(e)=>setDescription(e.target.value || 'Description:This is about Song ')} />
                    </div>
                    <div className=' w-full flex justify-center px-5 py-2  '>
                      <input type="submit" className=' bg-green-500 transition-all transform duration-300 hover:bg-green-600 hover:scale-110 text-white p-2 text-sm rounded-lg'  value='create playlist'  />
                    </div>
                    
                  </form>
          </div>
      </div>
         

      {/* MIDDLE */}
      { !user?(
        <div className="flex flex-col gap-5 mb-10 overflow-y-auto">

        <div className="bg-[#1F1F1F] w-full rounded-lg px-5 py-4 flex flex-col gap-2">
          <p className="text-white text-sm font-bold">
            Create your first playlist
          </p>
          <p className="text-white text-xs font-semibold">
            It's easy, we'll help you
          </p>
          <div className="pt-3">
            <button className="px-4 py-1.5 text-black bg-white rounded-full text-sm font-bold hover:scale-105 transition">
              Create playlist
            </button>
          </div>
        </div>

        <div className="bg-[#1F1F1F] w-full rounded-lg px-5 py-4 flex flex-col gap-2">
          <p className="text-white text-sm font-bold">
            Let's find some podcasts to follow
          </p>
          <p className="text-white text-xs font-semibold">
            We'll keep you updated on new episodes
          </p>
          <div className="pt-3">
            <button className="px-4 py-1.5 text-black bg-white rounded-full text-sm font-bold hover:scale-105 transition">
              Browse podcasts
            </button>
          </div>
        </div>

      </div>): playlists.length===0 ? (<div>
            <p className='text-sm mb-2  font-semibold'>Your Playlists</p>
        <p>There is nothing in your playlist</p></div> ): (
        
        <div className="flex flex-col gap-2 mb-2 overflow-y-auto">
            <p className='text-sm mb-2  font-semibold'>Your Playlists</p>

           {loading && <p>Loading ...</p>}
      {error && <p>Error: {error}</p>}
          {
            playlists?.map((playlist ,index)=>(
        <Link to={`playlistDetails/${playlist._id}`} key={index} className="bg-[#1F1F1F] w-full  rounded-lg px-5 py-4 flex flex-row gap-2">
          <div className='bg-green-500 rounded-full flex justify-center items-center p-2  w-12 h-12'>
              <p className='text-3xl font-bold  text-black'>{playlist.name.split('')[0]}</p>
          </div>
          <div className=''>
            <p className='text-lg font-semibold'>{playlist.name}</p>
            <p className='text-sm text-gray-300 font-semibold'>Playlist. {user.data.name}</p>
          </div>

        </Link>
            ))
          }
        </div>
      )}
      

      {/* BOTTOM */}
      <div className="flex flex-col gap-4 px-2">
        <div className="flex flex-wrap gap-3 text-xs font-semibold text-[#B3B3B3]">
          <p>Legal</p>
          <p>Privacy Center</p>
          <p>Privacy Policy</p>
          <p>Cookies</p>
          
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-semibold text-[#B3B3B3]">
            <p>About Ads</p>
          <p>Accessibility</p>
        </div>

        <p className="text-sm hover:underline text-white cursor-pointer">
          Cookies
        </p>
            <div className='mt-5'>
                <button className="px-3 py-1.5  text-white border border-white flex items-center justify-center gap-2 rounded-full text-sm font-bold hover:scale-105 transition">
          <FiGlobe className="text-lg" />
          English
        </button>
            </div>
        
      </div>
    </div>
  )
}

export default Sidebar