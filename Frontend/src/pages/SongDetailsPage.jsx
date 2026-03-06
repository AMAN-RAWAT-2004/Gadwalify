import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSongDetails } from "../redux/slices/songSlice";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdClose } from "react-icons/md";
const SongDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
const navigate=useNavigate()
  const { songDetails, loading, error } = useSelector(
    (state) => state.songs
  );

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSong=()=>{
    navigate('/')
  }
  
  useEffect(() => {
    dispatch(fetchSongDetails(id));
  }, [dispatch, id]);

  
  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(percent || 0);
  };

 
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const value = e.target.value;

    if (!audio) return;

    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };

 

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (error) return <p className="text-red-500 p-6">Error...</p>;
  if (!songDetails) return null;

  return (
    <div className="relative min-h-screen bg-black text-white p-6">

      <div className=" max-w-xl mx-auto">

        
        <img
          src={songDetails.coverImage}
          alt={songDetails.title}
          className="w-100 h-100 rounded-2xl shadow-lg"
        />
      <MdClose onClick={handleSong} className=" absolute top-10 right-10 text-white text-4xl  "/>

        
        <h1 className="text-2xl font-bold mt-6">
          {songDetails.title}
        </h1>
        <p className="text-gray-400 w-100">{songDetails.artist}</p>

       
        <audio
          ref={audioRef}
          src={songDetails.audioUrl}
          onTimeUpdate={handleTimeUpdate}
        />

       
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={handlePlayPause}
            className="bg-green-500 hover:bg-green-400 text-center p-4 rounded-full font-semibold"
          >
            {isPlaying ? <FaPause className="text-2xl"/> : <FaPlay className="text-2xl"/>}
          </button>
        </div>

        
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-100 mt-4"
        />
      </div>
    </div>
  );
};

export default SongDetailsPage;