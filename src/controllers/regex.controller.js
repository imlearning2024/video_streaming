import { asyncHandler } from "../utils/asyncHandler.js";
import Video from "../models/video.model.js";

const regexSearch = asyncHandler(async (req, res) => {
  const { pattern } = req.params;
  if (!pattern) {
    res.json({ success: false, message: "pattern can't be empty" });
  }

  const videos = await Video.aggregate([
    {
      $addFields: {
        result: {
          $regexMatch: {
            input: "$title",
            regex: `${pattern}`,
            options: "i",
          },
        },
      },
    },
    {
      $match: {
        result: true,
      },
    },
  ]);

  res.json(videos);
});

export default regexSearch;
