import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const userFromStorage =localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId)

//CREATE ASYNC THUNK FOR USER LOGIN

export const loginUser=createAsyncThunk('auth/loginUser',async(userData,{rejectWithValue})=>{
    try {

        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,userData)
        
        localStorage.setItem("userInfo", JSON.stringify(response.data))
        localStorage.setItem("userToken", response.data.token)
        return response.data.user;

    } catch (error) {
        return rejectWithValue(error.response.data)
    }

})

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, {
    rejectWithValue
}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`, userData);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user))
        localStorage.setItem("userToken", response.data.token)

        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// ASYNCTHUNK FOR FETCH ALL USERS 

export const fetchAllUsers=createAsyncThunk('auth/fetchAllUsers',async( _ ,{rejectWithValue})=>{
    try {
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('userToken')}`
            }

        })
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
        
    }

})

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user: userFromStorage,
        users:[],
        guestId: initialGuestId,
        loading: false,
        error: null,
    },
    reducers:{
        logout: (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.removeItem("userInfo")
            localStorage.removeItem("userToken")
            localStorage.setItem('guestId', state.guestId)
        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId)
        }
    }, extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        }).addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }).addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        }).addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }).addCase(fetchAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        }).addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export const {
    logout,
    generateNewGuestId
} = authSlice.actions;
export default authSlice.reducer;