const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new mongoose.Schema({
    imdbID: { type: String, required: true },
    title: { type: String, required: true },
    plot: { type: String },
    length: { type: String },
  });
  
  module.exports = mongoose.model('Movie', movieSchema);