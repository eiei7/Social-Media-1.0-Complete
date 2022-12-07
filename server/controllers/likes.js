import { Queries } from "../data/Queries.js";
import db from "../db.js";

export const getLikes = async (req, res) => {
  try {
    const { id } = req.params;

    db.query(Queries.getLikesQuery, [id], (err, data) => {
      if (err) return res.status(500).json(err);

      if (!data) return res.status(200).json([]);
      return res.status(200).json(data.map(({ pid, uid }) => uid));
    });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const addRemoveLike = async (req, res) => {
  try {
    const { id, addOrRemove, uid } = req.params;

    const q = addOrRemove ? Queries.removeLikeQeury : Queries.addLikeQeury;

    console.log(q);
    const feedback = addOrRemove ? "Like has been Cancled." : "Liked.";
    db.query(q, [uid, id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(feedback);
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
