import { Router } from "express";
import authentication from "../../middlewares/auth.middleware.js";
import { upload } from "../config/multer.config.js";
import {
  getAllUsers,
  login,
  registerUser,
  test,
  testHls,
} from "../controllers/controllers.js";
export const router = Router();

router.get("/test", test);
router.post("/api/videos/upload", authentication , upload.single("file"), testHls);

router.post("/api/auth/register", registerUser);
router.post("/api/auth/login", login);
router.get("/api/users", getAllUsers);
