import { asyncHandler } from "../utils/asyncHandler.js";
import Video from "../models/video.model.js";

const getAllVideo = asyncHandler(async (req, res) => {
  const videos = await Video.find({});
  res.json(videos);
});

export default  getAllVideo;
