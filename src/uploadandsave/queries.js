const addVideo = "INSERT INTO videos (videofile,originalname,filepath) VALUES ($1,$2,$3);";
const getLastAddedVideoId = "SELECT max(videoid) FROM videos";
const getVideoById = "SELECT videoid,originalname,filepath FROM videos  WHERE videoid = $1";

module.exports = {
  addVideo,
  getLastAddedVideoId,
  getVideoById
}