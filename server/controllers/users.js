import { Queries } from "../data/Queries.js";
import { default as db } from "../db.js";

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const q = id ? Queries.getUserQuery : Queries.getAllUserQuery;
    db.query(q, [id], (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data.length) {
        return res.status(404).json("unknown column name.");
      }
      const { password, ...otherInfo } = data[0];
      return res.status(200).json(otherInfo);
    });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getUserFollowed = async (req, res) => {
  try {
    const { id } = req.params;

    db.query(Queries.getUserFollowedQuery, [id], (err, data) => {
      if (err) return res.status(500).send(err);
      const formattedFollowed = data.map(
        ({
          followedId,
          firstName,
          lastName,
          occupation,
          gender,
          profilePic,
        }) => {
          return {
            followedId,
            firstName,
            lastName,
            occupation,
            gender,
            profilePic,
          };
        }
      );
      return res.status(200).json(formattedFollowed);
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const getUserFollower = async (req, res) => {
  try {
    const { id } = req.params;

    db.query(Queries.getUserFollowerQuery, [id], (err, data) => {
      if (err) return res.status(500).send(err);
      const formatterFollower = data.map(
        ({
          followerId,
          firstName,
          lastName,
          occupation,
          gender,
          profilePic,
        }) => {
          return {
            followerId,
            firstName,
            lastName,
            occupation,
            gender,
            profilePic,
          };
        }
      );
      return res.status(200).json(formatterFollower);
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const addRemoveFollowed = async (req, res) => {
  try {
    const { id, addOrRemove, fid } = req.params;

    const q = addOrRemove
      ? Queries.removeFollowedQuery
      : Queries.addFollowedQuery;
    const feedback = addOrRemove ? "DisFollowed." : "Followed.";
    db.query(q, [fid, id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(feedback);
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

export { getUser, getUserFollowed, getUserFollower, addRemoveFollowed };
