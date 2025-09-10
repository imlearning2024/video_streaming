import { asyncHandler } from "../utils/asyncHandler.js";

const test = asyncHandler((req, res) => {
    console.log(req)
  res.send("server : server running");
});
export default test;
