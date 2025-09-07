import { Router } from "express";
import authentication from "../../middlewares/auth.middleware.js";
import { upload } from "../config/multer.config.js";

import getAllUsers from "../controllers/getAllUsers.controller.js";
import login from "../controllers/login.controllers.js";
import refreshAcessToken from "../controllers/refreshAccessToken.controller.js";
import registerUser from "../controllers/registration.controller.js";
import test from "../controllers/test.controllers.js";
import hls from "../controllers/hls.controller.js"
import getAllVideo from "../controllers/getAllVideos.controller.js"
import refreshAccessTokenMiddleWare from "../../middlewares/refreshAccessToken.middleware.js";
export const router = Router();

router.get("/test", test);
router.post("/api/videos/upload", authentication, upload.single("file"), hls);

router.post("/api/auth/register", registerUser);
router.post("/api/auth/login", login);
router.get("/api/users", getAllUsers);
router.get("/api/auth/refreshtoken",refreshAccessTokenMiddleWare, refreshAcessToken);
router.get("/api/videos", getAllVideo);
