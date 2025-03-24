/*
  Made all the routes for comments to make fetching and saving data in database
  easy and efficiant.(routes: things we put after links- anime.com/solo-lvling , /solo-lvling is a route)

  saving all information we get from a comment is hard so we split the data in 3 routes
  and fetch/post/delete using  those 
*/

import express from "express"
import { addComment, deleteComment, getPostComments } from "../controllers/comment.controller.js"

const router = express.Router()

router.get("/:postId", getPostComments)  // route we use to see a comment
router.post("/:postId", addComment)  // route we use to make a comment
router.delete("/:id", deleteComment)  // route we use to delete a comment

export default router 