import mongoose from 'mongoose';
const schema = mongoose.Schema({
  tuit: String,
  likes: Number,
  liked: Boolean,
  dislikes: Number,
  disliked: Boolean,
  replies: Number,
  retuits: Number,
  userName: String,
  image: String,
  handle: String,
  time: String
}, {collection: 'tuits'});
export default schema;

