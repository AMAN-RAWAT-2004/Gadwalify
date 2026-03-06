import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSongs=createAsyncThunk('songs/fetchSongs',async(_,{rejectWithValue})=>{
    try {
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/songs/`)
        return {
        songs: response.data.Data.songs,
        totalSongs: response.data.songs,
      };
    } catch (error) {
        return rejectWithValue(error.response.data)
        
    }
})

export const fetchSongDetails=createAsyncThunk('songs/fetchSongDetails',async(id,{rejectWithValue})=>{
    try {
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/songs/${id}`)
        return  response.data.Data
    } catch (error) {
        return rejectWithValue(error.response.data)
        
    }
})

export const createSong = createAsyncThunk(
  "songs/createSong",
  async (songData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");

      const formData = new FormData();

      
      Object.keys(songData).forEach((key) => {
        if (key !== "audioFile" && key !== "coverImage") {
          formData.append(key, songData[key]);
        }
      });

      
      if (songData.audioFile) {
        formData.append("audio", songData.audioFile);
      }

      if (songData.coverImage) {
        formData.append("coverImage", songData.coverImage);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/songs`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const songSlice=createSlice({
    name:"songs",
    initialState:{
        songs:[],
        totalSongs:0,
        songDetails:null,
        loading:false,
        error:null,
        createSuccess: false,
    },
    reducers:{
         resetCreateSongState: (state) => {
    state.createSuccess = false;
    state.error = null;
  },
    },
    extraReducers:(builder)=>{
            builder.addCase(fetchSongs.pending,(state)=>{
                state.loading=true
                state.error=null

            }).addCase(fetchSongs.fulfilled,(state,action)=>{
                state.loading = false;
                state.songs = action.payload.songs;
                state.totalSongs = action.payload.totalSongs;
            }).addCase(fetchSongs.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
            }).addCase(fetchSongDetails.pending,(state)=>{
                state.loading=true
                state.error=null
            }).addCase(fetchSongDetails.fulfilled,(state,action)=>{
                state.loading = false;
                state.songDetails = action.payload;
            }).addCase(fetchSongDetails.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
            }).addCase(createSong.pending, (state) => {
             state.loading = true;
             state.error = null;
        state.createSuccess=false;

    })
    .addCase(createSong.fulfilled, (state, action) => {
      state.loading = false;
      state.createSuccess=true;
      state.songs.push(action.payload);
    })
    .addCase(createSong.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
      state.createSuccess=false;
    });
    }
})
export const { resetCreateSongState } = songSlice.actions;
export default songSlice.reducer;