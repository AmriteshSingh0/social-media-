import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
     title: String,
  content: String,
  file: String,                  // URL from Cloudinary
  likes: { type: Number, default: 0 },
  comments: [{ text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
   }],
});
 
const Post = mongoose.model('Post', postSchema);
export default Post;