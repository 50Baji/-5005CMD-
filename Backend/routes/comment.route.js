import express from "express"
import { addComment, deleteComment, getPostComments } from "../controllers/comment.controller.js"

const router = express.Router()

router.get("/:postId", getPostComments)  // route we use to see a comment
router.post("/:postId", addComment)  // route we use to make a comment
router.delete("/:id", deleteComment)  // route we use to delete a comment

export default router 
