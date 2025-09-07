import jwt from "jsonwebtoken";

import Token from "../models/token.model.js";

export const generateToken = (user, expiresIn, secret = process.env.JWT_SECRET) => {
   return jwt.sign({ id: user._id }, secret, { expiresIn });
};

const generateAuthTokens = async (user) => {
    const accessToken = generateToken(user, "15m");
    const refreshToken = generateToken(
        user,
        "7d",
        process.env.JWT_REFRESH_SECRET,
    );

    await Token.create({
        user: user._id,
        token: refreshToken,
        type: "refresh",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return { accessToken, refreshToken };
};

export const generateAccessToken = async (user) => {
    const accessToken = generateToken(user, "15m");
    return { accessToken };
};

export default generateAuthTokens;
