import db from "../db.js";
import { Queries } from "../data/Queries.js";

export const getComments = (req, res) => {
  try {
    const { id } = req.params;

    db.query(Queries.getCommentsQuery, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const addComment = (req, res) => {
  try {
    const { pid, uid, content, date } = req.body;

    db.query(
      Queries.addCommentQuery,
      [pid, uid, content, date],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Commented.");
      }
    );
  } catch (err) {
    res.status(404).json(err.message);
  }
};
