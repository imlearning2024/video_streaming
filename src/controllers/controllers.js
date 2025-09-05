import { process_hls } from "../utils/util.js";
import chalk from "chalk";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { asyncHandler } from "../utils/asyncHandler.js";
import path from "path";
import User from "../models/user.model.js";
import generateAuthTokens from "../utils/JWT.js";
import Video from "../models/video.model.js";
const __root_dir = process.cwd();

// const inputPath = path.join(__root_dir, "/public/video/video.mp4");
// const outPutDir = path.join(__root_dir, "/public/hls/");

const test = asyncHandler((req, res) => res.send("server : server running"));

const testHls = asyncHandler(async (req, res) => {

    // console.log(req.user);
    // res.json(req.user);
  const { title, description } = req.body;
  if (!title || !author) {
    res.json({ success: false, message: "all fields are required" });
  }

  const unique_id = uuid();
  const outPutDir = path.join(
    process.cwd(),
    `/public/hls/${req.file.fieldname}-${unique_id}`,
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
      const newVideo = new Video({
        title,
        author,
        description,
        url,
      });

      try {
        const savedVideo = await newVideo.save();

        if (!savedVideo) {
          res.json({
            success: false,
            message: "error saving video desc in database",
          });
        }
      } catch (error) {
        console.log(error);
        res.json(error);
      }

      res.json({
        success: true,
        message: "uploaded successfully",
        data: data,
        uploadedFile: req.file,
        url: `http://localhost:8000/public/hls/${req.file.fieldname}-${unique_id}/playlist.m3u8`,
      });
    }
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, sex } = req.body;
  if (!email || !password || !name || !sex) {
    res.json({
      success: false,
      message: "All fields are required , please fill all the fields",
    });
  }
  // console.log(email , password , name ,sex);
  const newUser = await User.create({
    name,
    email,
    sex,
    password,
  })
    .then(async (user) => {
      console.log("user:", user);
      const { accessToken, refreshToken } = await generateAuthTokens(user);
      // console.log(generateAuthTokens(user));
      // console.log(`acessToken:${accessToken} refreshToken:${refreshToken}`);
      if (!accessToken || !refreshToken) {
        res.json({
          success: false,
          message: "token generation failed",
        });
      }
      res.json({
        success: true,
        token: { refreshToken, accessToken },
        data: { name: user.name, email: user.email },
      });
    })
    .catch((err) =>
      res.status(400).json({
        success: false,
        error: err,
      }),
    );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  if (!email || !password) {
    res.json({ success: false, message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    res.json({ success: false, message: "failed to fetch user" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  console.log(isPasswordCorrect);
  console.log("credentials", user && isPasswordCorrect);
  if ((user && isPasswordCorrect) === true) {
    const { accessToken, refreshToken } = await generateAuthTokens(user);

    if (!accessToken || !refreshToken) {
      res.json({
        success: false,
        token: {},
        message: "error while generating tokens",
      });
    }

    res.json({
      success: true,
      token: { accessToken, refreshToken },
      message: "login successfull",
      data: { name: user.name, email: user.email },
    });
  } else {
    res.json({
      success: false,
      token: {},
      message: "Incorrect credentials",
    });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (!users) {
    res.json({ success: false, message: "failed to fetch users" });
  }
  res.json(users);
});
export { test, testHls, registerUser, login, getAllUsers };
