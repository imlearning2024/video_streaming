import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import generateAuthTokens from "../utils/JWT.js";
import Token from "../models/token.model.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

  if (!email || !password) {
    res.json({ success: false, message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  // console.log(user);

  if (!user) {
    res.json({ success: false, message: "failed to fetch user" });
  }

  const isPasswordCorrect = await user?.comparePassword(password);
  // console.log(isPasswordCorrect);

  if ((user && isPasswordCorrect) === true) {
    try {
      //deleting old refreshedToken
      const result = await Token.deleteMany({ user: user._id });
      console.log("deleted old refToken", result);
    } catch (error) {
      console.log("Error while deleting old refreshToken", error);
    }
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

export default login;
