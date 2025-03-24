/*
  code explain : Added User Saved Posts Routes: Created Express routes to manage user saved posts. The /saved route retrieves a user's 
      saved posts, while the /save route allows users to save or unsave posts. These routes connect to corresponding controller functions for handling database updates.
    
    reference: https://expressjs.com/en/guide/routing.html  


    Made all the routes for user to make fetching and saving data in database
  easy and efficiant.(routes: things we put after links- anime.com/solo-lvling , /solo-lvling is a route)

  by using 2 diffrent route we use '/saved' to fetch multiple posts to show in our page, and
    we use '/save' to see all the details of a single post.
*/

import express from "express"
import { getUserSavedPosts, savePost } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/saved", getUserSavedPosts)
router.patch("/save", savePost)

export default router 