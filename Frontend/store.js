import { configureStore } from "@reduxjs/toolkit";
import authReducer from './src/redux/slices/authSlice'
import songReducer from './src/redux/slices/songSlice'
import playlistReducer from './src/redux/slices/playlistSlice'
const store=configureStore({
    reducer:{
        auth:authReducer,
        songs:songReducer,
        playlist:playlistReducer,
    }
})

export default store;