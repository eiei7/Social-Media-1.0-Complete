import express from "express";
import { getLikes, addRemoveLike } from "../controllers/likes.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/singlepost/:id/like", verifyToken, getLikes);

/* UPDATE */
router.get(
  "/singlepost/like/:id/:addOrRemove/:uid",
  verifyToken,
  addRemoveLike
);

export default router;
