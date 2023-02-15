const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  dateCreation: { type: Date, default: Date.now, required: true },
  gameCount: { type: Number, default: 0 },
  bestGame: { type: Schema.Types.ObjectId, ref: 'Game' },
  bestGames: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  // Position in rating (later)
  // Theme (later)
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
});

export { Schema, model };
module.exports = model('User', UserSchema);
