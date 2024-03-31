import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
// credentials -> true client - server arası cookie göndermeni sağlar
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(8800, () => console.log("Server is running..."));
