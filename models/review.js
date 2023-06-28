// review.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    imdbId: {
      type: string,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    title: {
      type: string,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
