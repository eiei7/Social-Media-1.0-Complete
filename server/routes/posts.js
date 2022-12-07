import express from "express";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/posts/:id/feed", verifyToken, getFeedPosts);
router.get("/posts/:id/posts", verifyToken, getUserPosts);

/* WRITE */
//router.post("/posts/:id/write", verifyToken, createPost);

export default router;
