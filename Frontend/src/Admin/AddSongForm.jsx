import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSong, resetCreateSongState } from "../redux/slices/songSlice";
import { useEffect } from "react";

const AddSongForm = () => {
    const dispatch=useDispatch()
     const { loading, error, createSuccess } = useSelector(
    (state) => state.songs
  );
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "",
    genre: "",
    language: "",
    isPublished: true,
  });

  const [audioFile, setAudioFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    dispatch(createSong({
      ...formData,
      audioFile,
      coverImage,
    }) )
   
  };
     useEffect(() => {
    if (createSuccess) {
      alert("🎉 Song submitted successfully!");

      
      setFormData({
        title: "",
        artist: "",
        album: "",
        duration: "",
        genre: "",
        language: "",
        isPublished: true,
      });
      setAudioFile(null);
      setCoverImage(null);

      dispatch(resetCreateSongState());
    }
  }, [createSuccess, dispatch]);
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-4xl text-center font-bold mb-6">Add New Song 🎵</h2>
        {loading && <p>Loading ...</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Song Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Artist */}
        <input
          type="text"
          name="artist"
          placeholder="Artist Name"
          value={formData.artist}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Album */}
        <input
          type="text"
          name="album"
          placeholder="Album"
          value={formData.album}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Duration */}
        <input
          type="number"
          name="duration"
          placeholder="Duration (seconds)"
          value={formData.duration}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Genre */}
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Language */}
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={formData.language}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Audio Upload */}
        <div>
          <label className="block mb-1 font-medium">Audio File *</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
            required
            className="w-full"
          />
        </div>

        {/* Cover Upload */}
        <div>
          <label className="block mb-1 font-medium">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Publish Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          <span>Published</span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
        >
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AddSongForm;