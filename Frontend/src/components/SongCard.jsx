import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../redux/slices/songSlice";
import { Link } from "react-router-dom";
const SongCard = () => {
  const {songs,loading,error}=useSelector((state)=>state.songs)
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchSongs())
  },[dispatch])

    if(loading)return <p className="text-white">Loading ...</p>
    if(error)return <p>Error: {error}</p>
  return (
    <div className="flex gap-6  flex-nowrap no-scrollbar pb-2 overflow-y-hidden">
      {songs.map((song,index) => (
        <Link to={`/songdetails/${song._id}`}
          key={index}
          className="w-50 shrink-0 px-3 py-4 text-white rounded-lg hover:bg-gray-50/20 cursor-pointer transition-all duration-300"
        >
          {/* IMAGE */}
          <div className="w-full h-[180]">
            <img
              src={song.coverImage}
              alt={song.title}
              className="w-45 h-45 object-cover rounded-lg"
            />
          </div>

          {/* TEXT */}
          <div className="mt-3">
            <p className="text-lg  hover:underline font-semibold truncate">
              {song.title}
            </p>
            <p className="text-sm hover:underline text-gray-400 truncate">
              {song.artist}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SongCard;