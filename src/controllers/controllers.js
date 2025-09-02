import { process_hls } from "../utils/util.js";
import chalk from "chalk";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { asyncHandler } from "../utils/asyncHandler.js";
import path from "path";
const __root_dir = process.cwd();
// const inputPath = path.join(__root_dir, "/public/video/video.mp4");
// const outPutDir = path.join(__root_dir, "/public/hls/");

const test = asyncHandler((req, res) => res.send("server : server running"));

const testHls = asyncHandler(async (req, res) => {
    const unique_id = uuid();
    const outPutDir = path.join(
        process.cwd(),
        `/public/hls/${req.file.fieldname}-${unique_id}`,
    );

    // ...existing code...
    if (!fs.existsSync(outPutDir)) {
        console.log(chalk.yellow(`Creating directory: ${outPutDir}`));
        try {
            fs.mkdirSync(outPutDir);
        } catch (err) {
            console.error(chalk.red(`Failed to create directory: ${err.message}`));
            return res
                .status(500)
                .json({ error: "Failed to create output directory" });
        }
    }
    // process_hls(inputPath , outPutDir).then((data) => {
    //     res.json({"data":data})
    // })
    res.json({ data: req.file });
});

export { test, testHls };
