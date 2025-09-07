import User from "../src/models/user.model.js";
import { asyncHandler } from "../src/utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const authentication = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.json({
            success: false,
            message: "Auth header is empty or not provided",
        });
    }
    const acessToken = authHeader.split(" ")[1];
    // console.log(acessToken);
    if (!acessToken) {
        res.json({ success: false, message: "token not provided" });
    }

    try {
        const decodedToken = jwt.verify(acessToken, process.env.JWT_SECRET);
        const _id = decodedToken.id;
        console.log(_id);
        req.user = _id;
        console.log("from auth", _id);
        next();
    } catch (error) {
        console.log("JWT-ERROR", error.name);
        res.json({
            success: false,
            message: error.name || "error while decoding token",
        });
    }
});

export default authentication;
