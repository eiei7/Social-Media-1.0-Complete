import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.Authorization;

    if (!token) {
      return res.status(401).json("Access Denied!");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log("Authorization Pass.");
    next(); //connect middleware with callbacllk functions
  } catch (error) {
    res.status(500).json(error.message);
  }
};
