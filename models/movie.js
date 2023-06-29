const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
  imdbID: { type: String, required: true },
  title: { type: String, required: true },
  poster: { type: String},
  plot: { type: String },
  length: { type: String },
  isFavorite: { type: Boolean, default: false },
});

movieSchema.methods.toggleFavorite = function () {
    this.isFavorite = !this.isFavorite;
    return this.save();
  };

  
module.exports = mongoose.model('Movie', movieSchema);
