import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import generateAuthTokens  from "../utils/JWT.js";


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
      if (!user) {
        console.log("user registration failed");
      }
      console.log("user (registratino-controllers>>):", user);
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
        message: "Error while user registration hlss",
      })
    );
});


export default registerUser
