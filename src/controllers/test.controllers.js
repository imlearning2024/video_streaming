import { asyncHandler } from "../utils/asyncHandler.js";

const test = asyncHandler((req, res) => res.send("server : server running"));
export default test;
