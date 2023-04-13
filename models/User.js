import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  username: {type: String, required: true},
  favorites: [{type: Object}]
});

const Artist = {
  id: Number,
  name: String,
  picture_small: String,
  type: String,
};

const Album = {
  id: Number,
  title: String,
  cover_small: String,
  cover_medium: String,
  type: String,
};

const Song = {
  id: Number,
  title: String,
  title_short: String,
  explicit_lyrics: Boolean,
  preview: String,
  type: String,
  artist: Artist,
  album: Album,
};

export default model('User', userSchema);
