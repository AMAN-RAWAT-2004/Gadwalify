import React from "react";
import SongCard from "../components/SongCard";
import Playlist from "./PlaylistCard";

const Home = () => {
  return (
    <div className="px-6 py-6 space-y-6 overflow-y-hidden">
        <div>
            <h1 className="text-3xl font-bold text-white">
        Trending Songs
      </h1>

      <SongCard />
        </div>
        <div>
            <h1 className="text-3xl font-bold text-white">
        Playlists 
      </h1>

      <Playlist />
        </div>
      
    </div>
  );
};

export default Home;