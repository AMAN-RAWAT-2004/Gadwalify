const express=require('express');
const router=express.Router()
const mongoose  = require('mongoose');
const { protect } = require('../middlewares/authentication');
const Playlist=require('../models/Playlist')
const Song = require('../models/Song');


router.post('/',protect,async(req, res) => {
  try {
    const userId = req.user.id;
    const { name, description, isPublic } = req.body;

    
    if (!name) {
      return res.status(400).json({
        message: 'Playlist name is required',
      });
    }

    const playlist = await Playlist.create({
      name,
      description,
      isPublic,
      owner: userId,
    });

    res.status(201).json({
      message: 'Playlist created successfully',
      data: playlist,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

router.post('/:playlistId/songs/:songId', protect, async (req, res) => {
  try {
    const { playlistId, songId } = req.params
    const userId = req.user.id

    const playlist = await Playlist.findById(playlistId)

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" })
    }

    if (playlist.owner.toString() !== userId) {
      return res.status(403).json({
        message: "Not authorized to modify this playlist"
      })
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $addToSet: { songs: songId } }, // ⭐ prevents duplicates
      { new: true }
    ).populate("songs")

    res.status(200).json({
      message: "Song added successfully",
      data: updatedPlaylist
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.delete('/:playlistId/songs/:songId',protect,async(req,res)=>{
    const {playlistId,songId}=req.params;
    const userId=req.user.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(playlistId)||!mongoose.Types.ObjectId.isValid(songId)){
                return res.status(400).json({
                    message:'Invalid Playlist or Song Id'
                })
            }
        
   //  CHECK PLAYLIST
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({
        message: 'Playlist not found',
      });
    }

    // OWNER CHECK 
    if (playlist.owner.toString() !== userId) {
      return res.status(403).json({
        message: 'Not authorized to modify this playlist',
      });
    }

    // CHECK SONG IN PLAYLIST
    if (!playlist.songs.includes(songId)) {
      return res.status(400).json({
        message: 'Song not in playlist',
      });
    }

    // REMOVE SONG
    playlist.songs = playlist.songs.filter(
      (id) => id.toString() !== songId
    );

    
    playlist.totalSongs = playlist.songs.length;

    await playlist.save();

    res.status(200).json({
      message: 'Song removed from playlist',
      data: playlist,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

router.get('/my', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const playlists = await Playlist.find({
      owner: userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      message: 'Playlists fetched successfully',
      data: playlists
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});
router.get('/:id',protect,async(req,res)=>{
    try {
        const {id}=req.params;
        const playlistDetails=await Playlist.findById(id).populate('songs')

        if(!playlistDetails) return res.status(404).json({message:'somthing went wrong'})
        res.status(200).json({
      message: 'Playlists fetched successfully',
       playlistDetails
    });

    } catch (error) {
        console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
    }
})


router.put("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // 🔐 check ownership
    if (playlist.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    playlist.name = name || playlist.name;
    playlist.description = description || playlist.description;

    const updatedPlaylist = await playlist.save();

    res.status(200).json({
      message: "Playlist updated successfully",
      data: updatedPlaylist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found",
      });
    }

    // 🔐 check if playlist belongs to logged-in user
    if (playlist.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this playlist",
      });
    }

    await playlist.deleteOne();

    res.status(200).json({
      message: "Playlist deleted successfully",
      data: id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const playlists = await Playlist.find()
      .populate("owner", "name")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      message: "Playlists fetched successfully",
      data: playlists,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});
module.exports = router;