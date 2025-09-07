import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (!users) {
    res.json({ success: false, message: "failed to fetch users" });
  }
  res.json(users);
});

export default getAllUsers;
