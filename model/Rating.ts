const { Schema, model } = require('mongoose');

const RatingSchema = new Schema({
  username: { type: String, unique: true, required: true },
  bestGame: { type: Schema.Types.ObjectId, ref: 'Game' },
});

module.exports = model('Rating', RatingSchema);
