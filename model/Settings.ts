const { Schema, model } = require('mongoose');

const SettingsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  behavior: {
    testDifficulty: { type: String, required: true, default: 'normal' },
    quickRestart: { type: String, required: true, default: 'off' },
    language: { type: String, required: true, default: 'en' },
  },
  sound: {
    soundVolume: { type: String, required: true, default: 'quite' },
    playSoundOnclick: { type: String, required: true, default: 'off' },
    playSoundOnError: { type: String, required: true, default: 'off' },
  },
  caret: {
    smoothCaret: { type: String, required: true, default: 'off' },
    caretStyle: { type: String, required: true, default: 'off' },
  },
  appearance: {
    tpStyle: { type: String, required: true, default: 'mini' },
    tpColor: { type: String, required: true, default: 'main' },
    tpOpacity: { type: Number, required: true, default: 1 },
    fontSize: { type: Number, required: true, default: 1 },
    fontFamily: { type: String, required: true, default: 'robotoMono' },
  },
  theme: {
    flipTestColors: { type: String, required: true, default: 'off' },
    colorfulMode: { type: String, required: true, default: 'off' },
    theme: { type: String, required: true, default: 'default' },
  },
});

export { Schema, model };
module.exports = model('Settings', SettingsSchema);
