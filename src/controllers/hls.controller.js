import { process_hls } from "../utils/util.js";
import chalk from "chalk";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { asyncHandler } from "../utils/asyncHandler.js";
import path from "path";
import User from "../models/user.model.js";
import Video from "../models/video.model.js";

const hls = asyncHandler(async (req, res) => {
  const { title, description, author } = req.body;
  if (!title || !author) {
    res.json({ success: false, message: "all fields are required" });
  }

  const unique_id = uuid();
  const outPutDir = path.join(
    process.cwd(),
    `/public/hls/${req.file.fieldname}-${unique_id}`
  );
  const inputPath = req.file.path;
  if (!fs.existsSync(outPutDir)) {
    console.log(chalk.yellow(`Creating directory: ${outPutDir}`));
    try {
      fs.mkdirSync(outPutDir);
    } catch (err) {
      console.error(chalk.red(`Failed to create directory: ${err.message}`));
      return res
        .status(500)
        .json({ error: "Failed to create output directory" });
    }
  }
  process_hls(inputPath, outPutDir).then(async (data) => {
    if (data.complition_code === 0) {
      const url = `http://localhost:8000/public/hls/${req.file.fieldname}-${unique_id}/playlist.m3u8`;
      try {
        const _id = req.user;

        const user = await User.findById(_id);
        console.log("user-hls-before-saving", user);

        const newVideo = await Video.create({
          title,
          author,
          url,
          // user: _id,
          user: user._id,
          description,
        });
        console.log(newVideo);
        res.json({
          success: true,
          message: "uploaded successfully",
          data: data,
          url: `http://localhost:8000/public/hls/${req.file.fieldname}-${unique_id}/playlist.m3u8`,
        });
      } catch (error) {
        console.log(
          "Error while shaving video info and sending response hls",
          error
        );
        res.json({
          success: false,
          message: "Error while saving video details",
        });
      }
    }
  });
});

export default hls;
