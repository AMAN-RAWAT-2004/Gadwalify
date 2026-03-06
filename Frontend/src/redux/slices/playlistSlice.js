import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMyPlaylists = createAsyncThunk('playlist/fetchMyPlaylists', async (_, {
    rejectWithValue
}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/playlist/my`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})

export const createMyPlaylist = createAsyncThunk('playlist/createMyPlaylist', async (formData, {
    rejectWithValue
}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/playlist/`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        })
        return response.data.data;

    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})
export const fetchPlaylistDetails = createAsyncThunk('playlist/fetchPlaylistDetails', async (id, {
    rejectWithValue
}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/playlist/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
        return response.data.playlistDetails
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})
export const updateMyPlaylist = createAsyncThunk(
    "playlist/updateMyPlaylist",
    async ({
        id,
        playlistData
    }, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/playlist/${id}`,
                playlistData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);
export const deleteMyPlaylist = createAsyncThunk('playlist/deleteMyPlaylist', async (id, {
    rejectWithValue
}) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/playlist/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }

        })
        return response.data

    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})
export const fetchAllPlaylists = createAsyncThunk(
    "playlist/fetchAllPlaylists",
    async (_, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/playlist`
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const addSongToPlaylist = createAsyncThunk(
    "playlist/addSongToPlaylist",
    async ({
        playlistId,
        songId
    }, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/playlist/${playlistId}/songs/${songId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const removeSongFromPlaylist = createAsyncThunk(
    "playlist/removeSongFromPlaylist",
    async ({
        playlistId,
        songId
    }, {
        rejectWithValue
    }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/playlist/${playlistId}/songs/${songId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );

            return {
                playlistId,
                songId
            };
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {
        playlists: [],
        playlistDetails: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMyPlaylists.pending, (state) => {
                state.loading = true
                state.error = null

            }).addCase(fetchMyPlaylists.fulfilled, (state, action) => {
                state.loading = false
                state.playlists = action.payload

            }).addCase(fetchMyPlaylists.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message

            }).addCase(createMyPlaylist.pending, (state) => {
                state.loading = true
                state.error = null

            }).addCase(createMyPlaylist.fulfilled, (state, action) => {
                state.loading = false
                state.playlists.push(action.payload)

            }).addCase(createMyPlaylist.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message

            }).addCase(fetchPlaylistDetails.pending, (state) => {
                state.loading = true
                state.error = null

            }).addCase(fetchPlaylistDetails.fulfilled, (state, action) => {
                state.loading = false
                state.playlistDetails = action.payload

            }).addCase(fetchPlaylistDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message

            }).addCase(updateMyPlaylist.pending, (state) => {
                state.loading = true
                state.error = null

            }).addCase(updateMyPlaylist.fulfilled, (state, action) => {
                state.loading = false
                const updatedPlaylist = action.payload;
                const index = state.playlists.findIndex((playlist) => playlist._id === updatedPlaylist._id)
                if (index !== -1) {
                    state.playlists[index] = updatedPlaylist;
                }

            }).addCase(updateMyPlaylist.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message

            }).addCase(deleteMyPlaylist.fulfilled, (state, action) => {
                state.loading = false
                state.playlists = state.playlists.filter((playlist) => playlist._id !== action.payload)

            }).addCase(fetchAllPlaylists.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(fetchAllPlaylists.fulfilled, (state, action) => {
                state.loading = false
                state.playlists = action.payload
            })

            .addCase(fetchAllPlaylists.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message
            }).addCase(addSongToPlaylist.fulfilled, (state, action) => {
                state.loading = false
                state.playlistDetails = action.payload
            }).addCase(removeSongFromPlaylist.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
                state.loading = false;

                const {
                    playlistId,
                    songId
                } = action.payload;

                if (state.playlistDetails && state.playlistDetails._id === playlistId) {
                    state.playlistDetails.songs = state.playlistDetails.songs.filter(
                        (song) => song._id !== songId
                    );
                }
            })

            .addCase(removeSongFromPlaylist.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || action.error.message
            })
    }
})

export default playlistSlice.reducer;