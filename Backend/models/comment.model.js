/*
   Code explaination: Added Mongoose Comment Schema: Implemented a Comment schema using Mongoose to 
           store user comments. Each comment references a User and a Post, ensuring relational integrity. Includes desc for the comment 
           content and timestamps for tracking.

    refference: https://mongoosejs.com/docs/guide.html
    
    Basically every time someone makes a comment we save or delete all these data from database.
    Here we are just defining all the data type we will need for those functions.
*/


import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
