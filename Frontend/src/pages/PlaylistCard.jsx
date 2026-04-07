import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPlaylists } from '../redux/slices/playlistSlice';
import { Link } from 'react-router-dom';

const Playlist = () => {
  const {playlists,loading,error}=useSelector((state)=>state.playlist)
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchAllPlaylists())
    // console.log("All playlists:", playlists)
  },[dispatch,fetchAllPlaylists])

    if(loading)return <p className="text-white">Loading ...</p>
    if(error)return <p>Error: {error}</p>
  return (
    <div className="flex gap-6  flex-nowrap no-scrollbar pb-2 overflow-y-hidden">
      {playlists && playlists.map((playlist,index) => (
        <Link to={`/playlistdetails/${playlist._id}`}
          key={index}
          className="w-50 shrink-0 px-3 py-4 text-white rounded-lg hover:bg-gray-50/20 cursor-pointer transition-all duration-300"
        >
          {/* IMAGE */}
          <div className="w-45 h-45 bg-green-600 rounded-lg flex justify-center items-center ">
            <p

          
              className="text-black text-7xl font-bold " >{playlist.name.split(' ')[0].split('')[0]}</p>
          </div>

          {/* TEXT */}
          <div className="mt-3">
            <p className="text-lg  hover:underline font-semibold truncate">
              {playlist.name}
            </p>
            <p className="text-sm hover:underline text-gray-400 truncate">
              {playlist.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Playlist
