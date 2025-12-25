var mongoose = require("mongoose");

// Define schema for Hour
var hour = new mongoose.Schema({
  days: { type: String, required: true },
  open: String,
  close: String,
  isClosed: { type: Boolean, required: false },
});

// Define schema for Comment
var comment = new mongoose.Schema({
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Define schema for Venue
var venue = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  rating: { type: Number, required: true, min: 0, max: 5, default: 0 },
  menu: [String],
  coordinates: { type: [Number], index: "2dsphere" },
  hours: [hour],
  comments: [comment],
},{ versionKey: false });

// Compile model from schema (third parameter specifies collection name)
mongoose.model("Venue", venue, "venues");