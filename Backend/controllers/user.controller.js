/*
  code explaination: Implemented Saved Posts Feature: Developed API endpoints to allow users to 
       save and unsave posts. The getUserSavedPosts endpoint retrieves a user's saved posts, while the savePost endpoint toggles 
       saving/unsaving a post in the database. Authentication is required for both actions.

  reference: https://stackoverflow.com/questions/34217874/mongodb-array-push-and-pull

  Here we use all the data we take from the user in 'models/user.model.js' and check if they are a user or not.
  If they are they are allowed to make chainges, otherwise not
*/

import User from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  res.status(200).json(user.savedPosts);
};

export const savePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  const isSaved = user.savedPosts.some((p) => p === postId);

  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }

  res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
};
