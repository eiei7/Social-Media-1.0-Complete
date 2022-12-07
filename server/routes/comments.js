import express from "express";
import { getComments, addComment } from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/posts/:id/comments", verifyToken, getComments);

/* Write */
router.post("/posts/:id/comments/:uid", verifyToken, addComment);

export default router;
