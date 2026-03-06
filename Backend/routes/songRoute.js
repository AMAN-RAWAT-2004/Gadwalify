const express = require('express')
const router = express.Router()
const Song = require('./../models/Song')
const {
  protect,
  admin
} = require('./../middlewares/authentication')
const upload = require('./../middlewares/upload')
const uploadToCloudinary = require('../utils/uploadToCloudinary')
const mongoose=require('mongoose')

router.post(
  '/',
  protect,
  admin,
  upload.fields([{
      name: 'audio',
      maxCount: 1
    },
    {
      name: 'coverImage',
      maxCount: 1
    },
  ]),
  async (req, res) => {
    try {
      const {
        title,
        artist,
        duration,
        genre
      } = req.body

      console.log("BODY:", req.body)
      console.log("FILES:", req.files)

      // 🔍 better validation
      if (!title || !artist || !duration) {
        return res.status(400).json({
          message: "Missing text fields",
        })
      }
      console.log(1);

      if (!req.files || !req.files.audio || req.files.audio.length === 0) {
        return res.status(400).json({
          message: "Audio file is required",
        })
      }
      console.log(2);

      const durationNumber = Number(duration)
      console.log(durationNumber)
      // ☁️ upload audio
      const audioResult = await uploadToCloudinary(
        req.files.audio[0],
        "uttarakhand-songs/audio",
        "video"
      )
      console.log(3);


      // ☁️ upload image (optional)
      let imageUrl = ""

      if (req.files.coverImage && req.files.coverImage.length > 0) {
        const imageResult = await uploadToCloudinary(
          req.files.coverImage[0],
          "uttarakhand-songs/images",
          "image"
        )
        imageUrl = imageResult.secure_url
      }
      console.log(4);

      const song = await Song.create({
        title,
        artist,
        duration: durationNumber,
        genre,
        audioUrl: audioResult.secure_url,
        coverImage: imageUrl,
      })
      console.log(5);

      res.status(201).json({
        message: "Song uploaded successfully",
        data: song,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Server error",
      })
    }
  }
)

router.get('/', async (req, res) => {
  try {
    const songs = await Song.find({});
    if (!songs) return res.status(404).json({
      message: 'Not Found'
    })
    res.status(200).json({
      message: 'Success',
      songs: songs.length,
      Data: {
        songs
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server error",
    })
  }
})

router.get('/:id', async (req, res) => {
  const {
    id
  } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
      message: 'Invalid Song Id'
    })
    const song = await Song.findById(id);
    if (!song) return res.status(404).json({
      message: 'Not Found'
    })
    res.status(200).json({
      message: 'Success',
      Data:song
      
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server error",
    })
  }
})

router.delete('/:id', async (req, res) => {
  const {
    id
  } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
      message: 'Invalid Song Id'
    })
    const song = await Song.findByIdAndDelete(id);
    if (!song) return res.status(404).json({
      message: 'Not Found'
    })
    res.status(200).json({
      message: "Song deleted successfully"
      
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server error",
    })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid song id',
      });
    }

   
    const song = await Song.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,          
        runValidators: true 
      }
    );

   
    if (!song) {
      return res.status(404).json({
        message: 'Song not found',
      });
    }

    
    res.status(200).json({
      message: 'Song updated successfully',
      data: song,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

module.exports = router;