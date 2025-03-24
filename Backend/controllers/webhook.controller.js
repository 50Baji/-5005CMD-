/*
  Code explain:  Implemented a webhook to handle user creation and deletion events from Clerk:
 • user.created: Automatically saves new users to the database with their clerkUserId, username, email, and profile image.
 • user.deleted: Removes the user from the database and deletes all associated posts and comments.
 • Secure webhook verification is implemented using svix to validate incoming requests.

 reference (clerk webhook): https://clerk.com/docs/webhooks/sync-data

 basic idea: Using  Clerk webhook documentation, created function that add/delete users
             from database. And handel creation/delete/saving of posts and comments made by a specific user.
             example: 'user'-['comments'-[a,v,d,k], 'posts'-[x,c,d,e]]. 
 */


import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { Webhook } from "svix";
import dotenv from 'dotenv';
dotenv.config();

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  console.log(evt);
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return res.status(400).json({
      message: "Webhook verification failed!",
    });
  }

  

  if (evt.type === "user.created") {
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_img_url,
    });

    await newUser.save();
  }

  if (evt.type === "user.deleted") {
    const deletedUser = await User.findOneAndDelete({
      clerkUserId: evt.data.id,
    });

    await Post.deleteMany({user:deletedUser._id})
    await Comment.deleteMany({user:deletedUser._id})
  }
  
  return res.status(200).json({
    message: "Webhook received",
  });
};
