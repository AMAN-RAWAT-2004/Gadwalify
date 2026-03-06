import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addSongToPlaylist, deleteMyPlaylist, fetchPlaylistDetails, removeSongFromPlaylist, updateMyPlaylist } from "../redux/slices/playlistSlice";
import { PiDotsThreeCircle } from "react-icons/pi";
import { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { fetchSongs } from "../redux/slices/songSlice";
import { FaPlusCircle, FaTrash } from "react-icons/fa";


const PlaylistDetails = () => {
  const { id } = useParams();
      const {songs,}=useSelector((state)=>state.songs)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [openUpdatePlaylistForm,setOpenUpdatePlaylistForm]=useState(false);
  const [openPlaylistMenu, setOpenPlaylistMenu] = useState(false);
  const { playlistDetails, loading, error } = useSelector(
    (state) => state.playlist,
  );
  
  useEffect(()=>{
    dispatch(fetchSongs())
  },[dispatch])
  useEffect(() => {
    if (id) {
      dispatch(fetchPlaylistDetails(id));
    }
  }, [dispatch,id]);
  
  const handleEditAndDeletePlaylistMenu=()=>{
        setOpenPlaylistMenu(!openPlaylistMenu)
  }

 const handleDeleteMyPlaylist = async () => {
  if (!id) return;

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this playlist?"
  );

  if (!confirmDelete) return;

  try {
    await dispatch(deleteMyPlaylist(id)).unwrap();
    alert("Playlist deleted successfully");
    navigate("/"); 
  } catch (error) {
    alert(error || "Failed to delete playlist");
  }
};
const toggleUpdatePlaylistForm=()=>{
    setOpenUpdatePlaylistForm(!openUpdatePlaylistForm)
}
const handleSubmitUpdatePlaylistData = (e) => {
    e.preventDefault();
  if (!name.trim()) {
    alert("Playlist name is required");
    return;
  }

 dispatch(
  updateMyPlaylist({
    id,
    playlistData: { name, description },
  })
);
    setOpenUpdatePlaylistForm(false)
        setOpenPlaylistMenu(false)
        navigate('/')

};

useEffect(() => {
  if (playlistDetails) {
    setName(playlistDetails.name || "");
    setDescription(playlistDetails.description || "");
  }
}, [playlistDetails]);



const handleAddSong = (songId) => {
  dispatch(
    addSongToPlaylist({
      playlistId:id,
      songId
    })
  )
}
const handleRemoveSong = (songId) => {
  dispatch(
    removeSongFromPlaylist({
      playlistId: id,
      songId,
    })
  );
};
  return (
    <div className="w-full p-4">
      {/* PLAYLIST HEADER */}
      <div className="relative w-full h-50 p-2 bg-gray-600/25 flex items-center gap-6">
        <div className="rounded-full bg-green-500 w-45 h-45 flex items-center justify-center">
          <p className="text-7xl font-bold text-black">
            {playlistDetails?.name?.trim().split(" ")[0].split('')[0]}
          </p>
        </div>

        <div className="text-white">
          <h1 className="text-2xl font-bold">{playlistDetails?.name}</h1>
          <p className="text-sm">{playlistDetails?.description}</p>
          <p className="text-sm mb-4 text-gray-400">
  {playlistDetails?.songs?.length || 0} songs
</p>
        </div>
        {
            openPlaylistMenu ? 
        <GiCancel onClick={handleEditAndDeletePlaylistMenu} className="absolute text-4xl top-5 hover:cursor-pointer right-8"/>
            
            : 
        <PiDotsThreeCircle onClick={handleEditAndDeletePlaylistMenu} className="absolute text-4xl top-5 hover:cursor-pointer right-8"/>

        }
        <div className={`${openPlaylistMenu?'absolute':'hidden'} transition-all transform duration-300 p-1 w-30 h-30 top-5 right-18 z-15 bg-gray-500/45`}>
            <div onClick={toggleUpdatePlaylistForm} className="w-full rounded-lg transition-all transform duration-300 text-lg flex items-center justify-center hover:bg-gray-500/45 h-14">
                Edit
            </div>
            <div onClick={handleDeleteMyPlaylist} className="w-full rounded-lg transition-all transform duration-300 text-red-600 text-lg flex items-center justify-center hover:bg-gray-500/45 h-14">
                Delete
            </div>
        </div>
        <div className={` p-5 top-5 right-0 z-20 transition transform duration-300 bg-[#282828] w-180 h-130  rounded-lg ${openUpdatePlaylistForm ? 'absolute':'hidden'} `}>
                            <GiCancel className="text-2xl" onClick={toggleUpdatePlaylistForm} />

                          <form onSubmit={handleSubmitUpdatePlaylistData} className='w-full flex flex-col gap-5 justify-center  ' >
                            <h1 className='text-center text-2xl uppercase font-bold mb-5'>Create your playlist</h1>
                            <div className='flex flex-col gap-2 px-5  '>
                              <label className='text-xs uppercase'>Playlist name</label>
                              <input type="text" className='border w-full text-white p-2 text-sm rounded-lg' value={name}  placeholder='playlist name...' onChange={(e)=>setName(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-2 px-5  '>
                              <label className='text-xs uppercase'>Description</label>
                              <textarea rows={4} className='border w-full text-white p-2 text-sm rounded-lg'  value={description} placeholder='playlist description...' onChange={(e)=>setDescription(e.target.value)} />
                            </div>
                            <div className=' w-full flex justify-center px-5 py-2  '>
                              <input type="submit" className=' bg-green-500 transition-all transform duration-300 hover:bg-green-600 hover:scale-110 text-white p-2 text-sm rounded-lg'  value='Update playlist'  />
                            </div>
                          </form>
                  </div>
      </div>

      {/* SONGS SECTION */}
      <div className="mt-6">

      <h1 className='text-center text-3xl  underline font-bold mb-6'>Your Songs</h1>
        
        {loading && <p className="text-white">Loading playlist...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {
  playlistDetails?.songs?.length > 0 ? (
    <div className="flex flex-col gap-3">
      {playlistDetails.songs.map((song) => (
        <div
          key={song._id}
          className="w-full flex items-center gap-3 rounded-lg p-2 h-24 bg-gray-200"
        >
          <div className="h-full w-20">
            <img
              src={song.coverImage || "/default-cover.png"}
              alt={song.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <p className="text-xl text-gray-800 font-semibold">
              {song.title}
            </p>
            <p className="text-lg text-gray-600 font-semibold">
              {song.artist}
            </p>
          </div>
          <FaTrash
  onClick={() => handleRemoveSong(song._id)}
  className="text-red-500 text-2xl mr-4 cursor-pointer"
/>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-300">No songs in this playlist</p>
  )
}
      </div  >
      {/* RECOMMENDED ALL SONGS CAN ADD TO A PLAYLIST  */}

      <div className="my-6 ">
      <h1 className='text-center text-3xl  underline font-bold mb-6'>Recommended Songs</h1>
      {loading && <p>Loading ...</p>}
      {error && <p>Error: {error}</p>}
      <div className='flex flex-col justify-center items-center px-2 gap-5'>
        {
            songs.map((song)=> { 
                
                const isSongAdded = playlistDetails?.songs?.some(
    (s) => s._id === song._id
  );
                return(
                
                <div key={song._id} className='w-full flex justify-between items-center gap-3 rounded-lg p-2 h-24 bg-gray-600/35'>
                    <div className='h-full w-20  '>
                        <img src={song.coverImage} alt={song.title} className='w-20 h-20 rounded-lg'/>
                    </div>
                    <div className='h-full flex flex-col justify-start p-2 w-full'>
                        <p className='text-xl text-white font-semibold  '>{song.title}</p>
                        <p className='text-lg text-white font-semibold '>{song.artist}</p>
                    </div>
                    <FaPlusCircle
        onClick={() => !isSongAdded && handleAddSong(song._id)}
        className={`text-2xl mr-4 cursor-pointer transition ${
          isSongAdded
            ? "text-gray-400 hover:cursor-not-allowed "
            : "text-green-500 hover:scale-110"
        }`}
      />
                </div>
            )})
        }
      </div>
    </div>
    </div>
  );
};

export default PlaylistDetails;