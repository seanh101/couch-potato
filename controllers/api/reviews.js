// reviewController.js

const Review = require('../models/review');

// Create a review
async function createReview(req, res) {
  try {
    const { id: movieId } = req.params;
    const { comment, rating } = req.body;
    const userId = req.user.id; // Assuming you have user authentication implemented

    const review = new Review({
      movieId,
      userId,
      comment,
      rating,
    });

    await review.save();

    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
}

// Read all reviews for a movie
async function getReviews(req, res) {
  try {
    const { id: movieId } = req.params;

    const reviews = await Review.find({ movieId });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
}

// Update a review
async function updateReview(req, res) {
  try {
    const { id: movieId, reviewId } = req.params;
    const { comment, rating } = req.body;

    const review = await Review.findOneAndUpdate(
      { _id: reviewId, movieId },
      { comment, rating },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
}

// Delete a review
async function deleteReview(req, res) {
  try {
    const { id: movieId, reviewId } = req.params;

    const review = await Review.findOneAndDelete({ _id: reviewId, movieId });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
}

module.exports = {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
};
