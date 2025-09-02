import express from "express"
import { router } from "./src/routes/route.js";
import path from "path"

const app = express();

const __root_dir = process.cwd()
app.use("/public",express.static(path.join(__root_dir , "/public")) )
app.use("/" , router)


app.listen(8000 , ()=>{
    console.log("server: http://localhost:8000")
})







