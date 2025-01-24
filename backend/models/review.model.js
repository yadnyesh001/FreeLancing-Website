import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The user giving the review (can be client or freelancer)
  },
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The user receiving the review (can be client or freelancer)
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true, // Project associated with the review
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comments: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
