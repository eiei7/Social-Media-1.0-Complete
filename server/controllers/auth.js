import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Queries } from "../data/Queries.js";
import { default as db } from "../db.js";

/* REGISTRATION */
export const register = (req, res) => {
  try {
    const usersInfo = req.body;

    /* fetch data from database. */
    db.query(Queries.registerInfoQuery, [usersInfo.email], (err, data) => {
      console.log(Queries.registerInfoQuery);
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      if (data.length) {
        console.log("User already exists!");
        return res.status(409).json("User already exists!");
      }
    });

    /* encrypt user's password. */
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(usersInfo.password, salt);

    /* write newUser's data into users table. */
    const values = [
      usersInfo.firstName,
      usersInfo.lastName,
      usersInfo.email,
      hash,
      usersInfo.phoneNumber,
      usersInfo.gender,
      usersInfo.location,
      usersInfo.occupation,
      usersInfo.profilePic,
    ];

    db.query(Queries.InsertIntoUsersQuery, [values], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err.message);
      }
      console.log("User has been created.");
      return res.status(200).json({ message: "User has been created." });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

/* LOGIN */
export const login = (req, res) => {
  /* check if user exist or not. */
  const usersLoginInfo = req.body;

  db.query(Queries.loginInfoQuery, [usersLoginInfo.email], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      console.log("User not found!");
      return res.status(404).json("User not found!");
    }

    const usersStoredInfo = data[0];

    /* valid user's email and user's password. */
    const isPasswordCorrect = bcrypt.compareSync(
      usersLoginInfo.password,
      usersStoredInfo.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong username or password!");
    }

    /* use jsonwebtoken and record token in cookies. */
    const token = jwt.sign({ id: usersStoredInfo.id }, process.env.JWT_SECRET);
    const { password, ...otherInfo } = usersStoredInfo;

    res
      .cookie("Authorization", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ otherInfo, token });
  });
};

/* LOGOUT */
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ message: "You has been logged out." });
  console.log("You has been logged out.");
};
