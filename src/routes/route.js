import { Router } from "express";
import { upload } from "../config/multer.config.js";
import { test, testHls } from "../controllers/controllers.js";
export const router = Router();

router.get("/test", test);
router.post("/upload",upload.single("file") , testHls);
