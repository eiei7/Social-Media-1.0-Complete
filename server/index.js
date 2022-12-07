import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import { getUser } from "./controllers/users.js";
import { verifyToken } from "./middleware/auth.js";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  /*cb: callback function
      destination: where the file has been saved
      filename: the name of original file
      */
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); //Date.now()+file.originalname to avoid conflict of duplication.
  },
});

const upload = multer({ storage });

/* ROUTES WITH FILES */
/* router, middleware upload picture to "public/assets" which will be called before register function/controller */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts/write", verifyToken, upload.single("picture"), createPost);

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", likeRoutes);
app.use("/", commentRoutes);


const PORT = process.env.PORT || 8800;

try {
  app.listen(PORT, () =>
    console.log(`Successful connected with port: ${PORT}`)
  );
} catch (error) {
  console.log(`${err} failed to connect`);
}
