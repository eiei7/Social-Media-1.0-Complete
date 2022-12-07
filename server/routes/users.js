import express from "express";
import {
  getUser,
  addRemoveFollowed,
  getUserFollowed,
  getUserFollower,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* `/:id`: fronted will send data to this specific id.
   verifyToken as middleware will be executed before getUser.
*/
/* READ */
router.get("/users/:id", getUser);
router.get("/users/:id/followed", verifyToken, getUserFollowed);
router.get("/users/:id/follower", verifyToken, getUserFollower);

/* UPDATE */
router.get("/users/:id/:addOrRemove/:fid", verifyToken, addRemoveFollowed);

export default router;
