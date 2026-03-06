const mongoose = require("mongoose")

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    artist: {
      type: String,
      required: true,
      trim: true,
    },

    album: {
      type: String,
      default: "",
    },

    duration: {
      type: Number, 
      required: true,
    },

    audioUrl: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    genre: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "",
    },

    plays: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

const Song = mongoose.model("Song", songSchema)

module.exports= Song