/*
 Code explaination: Added Mongoose User Schema: Implemented a User schema using Mongoose to store user details, including clerkUserId,
       username, email, profile image, and saved posts. This ensures structured user data storage in MongoDB.
  refference : https://mongoosejs.com/docs/guide.html
  Basicully we need all these details, to save in our database, and fetch these when user logIn.     
*/

import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    savedPosts: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
