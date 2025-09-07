import { asyncHandler } from "../utils/asyncHandler.js";

const refreshAcessToken = asyncHandler(async (req, res) => {
  const accessToken = req.accessToken;

  console.log("accessToken from RefresAccessTokenRouter:", accessToken);

  res.json({
    sucess: true,
    message: "refresh token successfully",
    token: { accessToken },
  });
});

export default refreshAcessToken;
