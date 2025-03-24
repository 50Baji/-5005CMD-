/*
  Made all the routes for all diffrent type of posts to make fetching and saving data in database
  easy and efficiant.(routes: things we put after links- anime.com/solo-lvling , /solo-lvling is a route)
*/

import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
} from "../controllers/post.controller.js";
import increaseVisit from "../middlewares/increaseVisit.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth);

router.get("/", getPosts);
router.get("/:slug", increaseVisit, getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/feature", featurePost);

export default router;
