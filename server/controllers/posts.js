import db from "../db.js";
import moment from "moment";
import { Queries } from "../data/Queries.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    const values = [
      userId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      description,
      picturePath,
    ];

    db.query(Queries.createPostQuery, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      console.log("Post has been created.");
      return res.status(200).json("Post has been created.");
    });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const { id } = req.params;

    db.query(Queries.getFeedPostsQuery, [id, id], (err, data) => {
      if (err) return res.status(500).json(err);
      console.log(data);
      return res.status(200).json(data);
    });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;

    db.query(Queries.getUserPostsQuery, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } catch (err) {
    res.status(404).json(err.message);
  }
};
