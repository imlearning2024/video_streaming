import Token from "../src/models/token.model.js";
import User from "../src/models/user.model.js";
import { asyncHandler } from "../src/utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../src/utils/JWT.js";

const refreshAccessTokenMiddleWare = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader.split(" ")[1];

  if (!refreshToken) {
    res.json({ success: false, message: "refresh token not provided" });
  }
  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );
        console.log(decodedToken)

        console.log("decodedToken",decodedToken.id);
    // const dbRefreshToken = await Token.findOne({ user: decodedToken.id });
    const dbRefreshToken = await Token.findOne({ user:decodedToken.id});
        console.log("dbref",dbRefreshToken);
        console.log("ref",refreshToken);

    if (!dbRefreshToken) {
      res.json({
        success: false,
        message: "cant fetch token using provided token",
      });
    }

    const isValidRefreshToken = dbRefreshToken.token == refreshToken;
    console.log("isMatch:", isValidRefreshToken);
    console.log("db:", dbRefreshToken.token, "\n");
    console.log("ref:", refreshToken);
    if (isValidRefreshToken) {
      try {
        const user = await User.findById(dbRefreshToken.user);

        if (!user) {
          res.json({
            success: false,
            message: "error while fetching user | refreshToken",
          });
        }

        const accessToken = generateToken(user, "15m");

        if (!accessToken) {
          res.json({
            success: false,
            message: "error while generating accessToken | refreshing token",
          });
        }

        req.accessToken = accessToken;

        next();
      } catch (error) {
        console.log("from refreshAccessToken", error);
      }
    } else {
      res.json({
        success: false,
        message: "refresToken & dbRefreshToken doesnt match",
      });
    }
  } catch (error) {
    console.log(
      "JWT-ERROR-refreshAccesstToken Error-name:",
      error.name,
      "Error:",
      error
    );
    res.json({
      success: false,
      message: error || "error while decoding token",
    });
  }
});

export default refreshAccessTokenMiddleWare;
