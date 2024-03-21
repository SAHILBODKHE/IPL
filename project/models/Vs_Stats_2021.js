const mongoose = require('mongoose');

// Define the schema
const vsStatsSchema = new mongoose.Schema({
  batsman: {
    type: String,
    required: true
  },
  bowl: {
    type: String,
    required: true
  },
  score_sum: {
    type: Number,
    required: true
  },
  score_mean: Number,
  out_sum: {
    type: Number,
    required: true
  },
  out_mean: Number,
  four_sum: {
    type: Number,
    required: true
  },
  six_sum: {
    type: Number,
    required: true
  },
  dot_sum: {
    type: Number,
    required: true
  },
  four_mean: Number,
  six_mean: Number,
  dot_mean: Number,
  success_ratio_factor: Number
});

// Create a Mongoose model
const VsStats = mongoose.model('vs_stats-2021', vsStatsSchema);

module.exports = VsStats;
