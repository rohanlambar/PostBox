// this contain data of post 
import mongoose from "mongoose";
import { Schema } from "mongoose";
import User from "./User.js";  // Import User model
import Comment from "./Comment.js";

const PostSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String },
  image: { type: String, required: true }, // URL of the uploaded image
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of users who liked the post
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

const Post =  mongoose.model('Post', PostSchema);
export default Post;

