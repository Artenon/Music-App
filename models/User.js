import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  username: {type: String, required: true},
  favorites: {
    tracks: [{type: Object}],
    albums: [{type: Object}]
  }
});

export default model('User', userSchema);
