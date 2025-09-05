import User from "../src/models/user.model.js";
import { asyncHandler } from "../src/utils/asyncHandler.js";
import { verifyJWT } from "../src/utils/JWT.js";

const authentication = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader.split(" ")[1]);
  //
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "Authentication failed: No or invalid token provided",
  //   });
  // }
  //
  // const jwt_token = authHeader.split(" ")[1];
  //
  // let decoded;
  // try {
  //   decoded = verifyJWT(jwt_token); // should return payload with user _id
  // } catch (err) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "Invalid or expired token",
  //   }); }
  //
  // const user = await User.findById(decoded._id);
  // if (!user) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "User not found or invalid token",
  //   });
  // }
  //
  // req.user = user;

  // console.log(req)
  // next();
});

export default authentication;
