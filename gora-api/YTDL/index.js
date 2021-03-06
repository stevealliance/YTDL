const fs = require("fs");
const path = require("path");
const express = require("express");
const config = require("config")();
const ytdl = require("ytdl-core");
const { socket } = require("../../socket.js");
var ffmpeg = require("ffmpeg");
const ThumbnailGenerator = require("video-thumbnail-generator").default;
let thumbs = [];

const ytdlApi = app => {
  const router = express.Router();
  app.use("/api/ytdl", router);

  router.post("/", async (req, res, next) => {
    const { body: data } = req;
    res.header(
      "Content-Disposition",
      `attachment; filename=uploads/${data.name}.mp4`
    );
    thumbs = [];
    try {
      await ytdl(data.url, {
        quality: "highestvideo"
      })
        .on("progress", async (length, downloaded, totallength) => {
          socket.io.emit("chunk_video", { length, downloaded, totallength });
          if (downloaded === totallength) {
            const tg = new ThumbnailGenerator({
              sourcePath: path.join(
                __dirname,
                `../../uploads/${data.name}.mp4`
              ),
              thumbnailPath: path.join(__dirname, "../../uploads/thumbs/")
            });
            await tg
              .generateOneByPercent(10, {
                size: "100%",
                filename: `${data.name}_1`
              })
              .then(th => thumbs.push(th));
            await tg
              .generateOneByPercent(50, {
                size: "100%",
                filename: `${data.name}_2`
              })
              .then(th => thumbs.push(th));
            await tg
              .generateOneByPercent(90, {
                size: "100%",
                filename: `${data.name}_3`
              })
              .then(th => {
                thumbs.push(th);
                socket.io.emit("video_loaded", { ...data, thumbs });
              });
            res.status(200).send({ ...data, thumbs });
          }
        })
        .pipe(await fs.createWriteStream(`uploads/${data.name}.mp4`));
    } catch (err) {
      next(err);
    }
  });
};

module.exports = ytdlApi;
