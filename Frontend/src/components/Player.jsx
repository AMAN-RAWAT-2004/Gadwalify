      import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useSelector } from "react-redux";

const Player = () => {
 const {song}=useSelector((state)=>state.song)
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // update progress
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio?.addEventListener("timeupdate", updateTime);

    return () => {
      audio?.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  if (!song) return null; // ✅ hide if no song selected

  return (
    <>
      {/* PLAYER FOOTER */}
      <div className="fixed bottom-0 left-0 w-full bg-[#121212] border-t border-gray-800 px-6 py-3 flex items-center justify-between z-50">
        
        {/* LEFT — SONG INFO */}
        <div className="flex items-center gap-3 w-1/4">
          <img
            src={song.cover}
            alt="cover"
            className="w-14 h-14 rounded-md object-cover"
          />
          <div>
            <p className="text-sm font-semibold">{song.title}</p>
            <p className="text-xs text-gray-400">{song.artist}</p>
          </div>
        </div>

        {/* CENTER — CONTROLS */}
        <div className="flex flex-col items-center w-2/4">
          <button
            onClick={togglePlay}
            className="bg-white text-black p-3 rounded-full hover:scale-105 transition"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full mt-2"
          />
        </div>

        {/* RIGHT — EMPTY / VOLUME LATER */}
        <div className="w-1/4 flex justify-end text-sm text-gray-400">
          {Math.floor(currentTime)}s / {Math.floor(duration)}s
        </div>
      </div>

      {/* HIDDEN AUDIO */}
      <audio ref={audioRef} src={song.audio} />
    </>
  );
};



export default Player
