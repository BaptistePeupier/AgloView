const {isUser} = require("../../Outils/auth");
const axios = require("axios")
const {sendMessage, sendError} = require("../../Outils/helper");

async function CreateVideo(req, res) {
  if (isUser(req, res)) {
    if (
      (typeof req.body.youtube_video_id !== "undefined") && (req.body.youtube_video_id !== null) &&
      (typeof req.body.id_playlist !== "undefined") && (req.body.id_playlist !== null)
    ){
      const apiKey = "AIzaSyBMoIqcF8lAihMcHub2_B8RiifMVyc-Mvs"
      const baseYTApiUrl = "https://www.googleapis.com/youtube/v3"
      const searchQuery = req.body.youtube_video_id[0];

      const video = await axios.get(`${baseYTApiUrl}/videos?part=snippet&id=${searchQuery}&key=${apiKey}`);
      if (video.data.pageInfo.totalResults > 0) {
        const video_tags = video.data.items[0].snippet.tags;
        const video_category_id = video.data.items[0].snippet.categoryId;

        let category;
        if (video_category_id !== null) {
          const videoCategory = await axios.get(`${baseYTApiUrl}/videoCategories?part=snippet&id=${video_category_id}&key=${apiKey}`);
          category = videoCategory.data.items[0].snippet.title;
        }

        // TODO: Save Viedo in DB & check Playlist exist
        // TODO: update User's tags

        sendMessage(res, {
          video_id: searchQuery,
          title: video.data.items[0].snippet.title,
          tags: video_tags,
          category: category
        })
      }
      else {
        sendError(res, "Video not found");
      }
    }
    else {
      sendError(res, "Missing Required Fields");
    }
  }
}
module.exports = CreateVideo;
