const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  dateCreation: { type: Date, default: Date.now, required: true },
  gameCount: { type: Number, default: 0 },
  bestGame: { type: Schema.Types.ObjectId, ref: 'Game' },
  bestGames: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  // Theme (later)
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  settings: { type: Schema.Types.ObjectId, ref: 'Settings', required: true },
  allTime: { type: Number, require: true, default: 0 },
});

export { Schema, model };
module.exports = model('User', UserSchema);
