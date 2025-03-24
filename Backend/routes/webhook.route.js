/*
 reference: https://expressjs.com/en/guide/routing.html  

 code explain: Integrated Clerk Webhook Handling: Implemented an Express route to handle Clerk authentication webhooks. 
      The /clerk route listens for incoming webhook events and processes them using the clerkWebHook controller. The request body is parsed as raw JSON using body-parser 
      to ensure proper handling of webhook payloads.
*/

import express from "express";
import { clerkWebHook } from "../controllers/webhook.controller.js";
import bodyParser from "body-parser";

const router = express.Router();

router.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  clerkWebHook
);

export default router;
