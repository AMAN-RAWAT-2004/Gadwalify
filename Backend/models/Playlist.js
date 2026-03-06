const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      default: 'My Playlist',
    },
    description: {
      type: String,
      default: 'Description',
    },

    coverImage: {
      type: String, 
      default: '',
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
      },
    ],

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Playlist= mongoose.model('Playlist', playlistSchema);
module.exports =Playlist;