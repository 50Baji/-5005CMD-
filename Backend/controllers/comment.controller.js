/*
 reference: https://mongoosejs.com/docs/5.x/docs/populate.html
 reference2: https://expressjs.com/en/guide/routing.html

     code explain:  Developed API endpoints for handling post comments:
• getPostComments: Fetches and returns comments for a given post, including user details (username, img).
• addComment: Allows authenticated users to add comments to posts.
• deleteComment: Enables users to delete their own comments. Admins can delete any comment.

Basic idea this file of code handels comment functionalitys, only the user who made the comment, or 
the admin(The teachers) can delete a comment. Anyone else will get denied.
and we check all those user details here, by fetching and compairing details who is trying to delete the comment
and the person who made the comment(saved in our database)
*/

import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

export const getPostComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "username img")
    .sort({ createdAt: -1 });

  res.json(comments);
};

export const addComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.params.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  const newComment = new Comment({
    ...req.body,
    user: user._id,
    post: postId,
  });

  const savedComment = await newComment.save();

  res.status(201).json(savedComment);
};

export const deleteComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const id = req.params.id;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth.sessionClaims?.metadata?.role || "user";

  if (role === "admin") {
    await Comment.findByIdAndDelete(req.params.id);
    return res.status(200).json("Comment has been deleted");
  }

  const user = await User.findOne({ clerkUserId });

  const deletedComment = await Comment.findOneAndDelete({
    _id: id,
    user: user._id,
  });

  if (!deletedComment) {
    return res.status(403).json("You can delete only your comment!");
  }

  res.status(200).json("Comment deleted");
};
