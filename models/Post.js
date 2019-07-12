// grab the things we need
import mongoose from "mongoose";
import { Schema } from "mongoose";

// create a schema
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    body: {
      type: String,
      required: true,
      trim: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

// the schema is useless so far
// we need to create a model using it
const Post = mongoose.model("Post", postSchema);

// make this available to our users in our Node applications
export default Post;
