import multer from "multer";
import path from "path";
const __root_dir = process.cwd();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__root_dir, "/temp"));
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});


export const upload = multer({storage: storage});
