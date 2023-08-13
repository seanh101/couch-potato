const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imdbID: { type: String, required: true },
  title: { type: String, required: true },
  poster: { type: String },
  plot: { type: String },
  length: { type: String },
  cast: [{ type: String }],
  overview: { type: String },
  isFavorite: { type: Boolean, default: false },
  rating: {
    type: Number,
    default: 0,
  }, 
});

movieSchema.methods.toggleFavorite = function () {
  this.isFavorite = !this.isFavorite;
  return this.save();
};

module.exports = mongoose.model('Movie', movieSchema);
