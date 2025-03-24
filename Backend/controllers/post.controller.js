/*
  This is a 2 week task because you are making post.model.js in week3(sp2):

    Week 2: Focused on API structure, authentication, and request handling:
         During the first week, we focused on setting up the foundational aspects of our backend, including defining routes and controllers 
         for handling user authentication, post creation, comment management, and webhook integration with Clerk for user data synchronization. 
         We structured API endpoints using Express, implementing key functionalities such as retrieving posts, creating and deleting posts, and managing comments. 
         Additionally, we integrated middleware for increasing post views and verifying Clerk webhooks to ensure seamless user account handling.
        

    week 3: integrate the database and enable full CRUD functionality.
         In the second week, our primary focus will be on implementing `post posts, including fields like title, content, category, 
         and user references. This model will enable us to handle operations like saving, updating, and deleting posts, as well as implementing features 
         like post visibility and managing image uploads through ImageKit. We will also focus on integrating the model into the existing routes and controllers 
         to ensure smooth interaction with the database. By the end of Week 2, we aim to complete the full post management system, allowing us to effectively manage 
         posts and their associated metadata within our application.
  
    
    
  • Genaral idea of whole code:  Here we handel every function related to posts. Who can make/delete a post(reference: clerk authentication )
            what details we fetch from our user when they are making the post(email, username, texts, profile-pic (allredy saved in our database when they made their acount))
            what happens when they delete the post, or if someone else try to delete theie post('not authenticated).
            Post filters , when we try to sort all the posts(popular, recent, old...)
            and some trouble shooting code.
*/


import ImageKit from "imagekit";
import Post from "../models/post.model.js"; //-------------
import User from "../models/user.model.js";
import dotenv from 'dotenv';
dotenv.config();

export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const query = {};

  console.log(req.query);

  const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const featured = req.query.featured;

  if (cat) {
    query.category = cat;
  }

  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: "i" };
  }

  if (author) {
    const user = await User.findOne({ username: author }).select("_id");

    if (!user) {
      return res.status(404).json("No post found!");
    }

    query.user = user._id;
  }

  let sortObj = { createdAt: -1 };

  if (sortQuery) {
    switch (sortQuery) {
      case "newest":
        sortObj = { createdAt: -1 };
        break;
      case "oldest":
        sortObj = { createdAt: 1 };
        break;
      case "popular":
        sortObj = { visit: -1 };
        break;
      case "trending":
        sortObj = { visit: -1 };
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
      default:
        break;
    }
  }

  if (featured) {
    query.isFeatured = true;
  }

  const posts = await Post.find(query)
    .populate("user", "username")
    .sort(sortObj)
    .limit(limit)
    .skip((page - 1) * limit);

  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;

  res.status(200).json({ posts, hasMore });
};

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate(
    "user",
    "username img"
  );
  res.status(200).json(post);
};

export const createPost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  console.log(req.headers);

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return res.status(404).json("User not found!");
  }

  let slug = req.body.title.replace(/ /g, "-").toLowerCase();

  let existingPost = await Post.findOne({ slug });

  let counter = 2;

  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug });
    counter++;
  }

  const newPost = new Post({ user: user._id, slug, ...req.body });

  const post = await newPost.save();
  res.status(200).json(post);
};

export const deletePost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth.sessionClaims?.metadata?.role || "user";

  if (role === "admin") {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json("Post has been deleted");
  }

  const user = await User.findOne({ clerkUserId });

  const deletedPost = await Post.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletedPost) {
    return res.status(403).json("You can delete only your posts!");
  }

  res.status(200).json("Post has been deleted");
};

export const featurePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth.sessionClaims?.metadata?.role || "user";

  if (role !== "admin") {
    return res.status(403).json("You cannot feature posts!");
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json("Post not found!");
  }

  const isFeatured = post.isFeatured;

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      isFeatured: !isFeatured,
    },
    { new: true }
  );

  res.status(200).json(updatedPost);
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};
