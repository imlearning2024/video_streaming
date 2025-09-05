import { spawn } from "child_process";
export const process_hls = (inputPath, outPutPath) => {
    return new Promise((resolve, reject) => {
        const args = [
            "-i",
            inputPath,
            "-c:v",
            "h264",
            "-profile:v",
            "main",
            "-level",
            "4.0",
            "-c:a",
            "aac",
            "-strict",
            "-2",
            "-start_number",
            "0",
            "-hls_time",
            "4",
            "-hls_list_size",
            "0",
            "-f",
            "hls",
            `${outPutPath}/playlist.m3u8`,
        ];

        // const args = [
        //     "-i",
        //     inputPath,
        //     "-map",
        //     "0:v",
        //     "-map",
        //     "0:a",
        //     "-c:v",
        //     "h264",
        //     "-c:a",
        //     "aac",
        //     "-strict",
        //     "-2",
        //     "-b:v:0",
        //     "800k",
        //     "-s:v:0",
        //     "640x360",
        //     "-profile:v:0",
        //     "main",
        //     "-b:v:1",
        //     "1400k",
        //     "-s:v:1",
        //     "842x480",
        //     "-profile:v:1",
        //     "main",
        //     "-b:v:2",
        //     "2800k",
        //     "-s:v:2",
        //     "1280x720",
        //     "-profile:v:2",
        //     "main",
        //     "-crf",
        //     "20",
        //     "-sc_threshold",
        //     "0",
        //     "-g",
        //     "48",
        //     "-keyint_min",
        //     "48",
        //     "-hls_time",
        //     "6",
        //     "-hls_list_size",
        //     "0",
        //     "-h",
        // ];

        const cmd = "ffmpeg";
        let stderr = "";
        let stdout = "";
        let complition_code = new Number();
        const ffmpeg = spawn(cmd, args);

        ffmpeg.stdout.on("data", (data) => {
            stdout = data.toString();
            console.log(`stdout: ${data}`);
        });

        ffmpeg.stderr.on("data", (data) => {
            stderr = data.toString();
            console.error(`stderr: ${data}`);
        });

        ffmpeg.on("close", (code) => {
            complition_code = Number(code);
            console.log(`child process exited with code ${code}`);

            if (code === 0) {
                resolve({ stderr, stdout, complition_code });
            } else {
                reject(new Error("hls_process failed , promise rejecetd"));
            }
        });
    });
};
