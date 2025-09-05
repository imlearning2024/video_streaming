import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { router } from "./src/routes/route.js";
import path from "path";
import cors from "cors";
import connectDb from "./src/db/db.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // allow Vite dev server
    credentials: true, // if you send cookies
  })
);
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const __root_dir = process.cwd();
app.use("/public", express.static(path.join(__root_dir, "/public")));
app.use("/", router);

app.listen(8000, async () => {
  await connectDb("mongodb://127.0.0.1/mini");
  console.log("server: http://localhost:8000");
});
