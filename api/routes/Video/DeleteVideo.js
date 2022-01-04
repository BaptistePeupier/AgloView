const Users = require("../../Outils/Schema/User")
const Videos = require("../../Outils/Schema/Videos")
const Playlists = require("../../Outils/Schema/Playlists")
const {isUser, getUserID} = require("../../Outils/auth");
const {sendMessage, sendError} = require("../../Outils/helper");

async function DeleteVideo(req, res) {
  if (isUser(req, res)) {
    if (
      (typeof req.body.video_id !== "undefined") && (req.body.video_id !== null)
    ) {
      // Check the right of the user
      const currentUser = await Users.findOne({_id: getUserID(req)})
      if (currentUser !== null) {
        currentUser.playlists = await Playlists.find({_id: {$in: currentUser.playlists}});
        for (let i = 0; i < currentUser.playlists.length; i++) {
          currentUser.playlists[i].videos = await Videos.find({_id: {$in: currentUser.playlists[i].videos}});
        }

        // Check if the video is in one of the user's playlists
        let i = 0;
        let videoFound = false;
        while ((!videoFound) && (i < currentUser.playlists.length)) {
          let j = 0;
          while ((!videoFound) && (j < currentUser.playlists[i].videos.length)) {
            if (currentUser.playlists[i].videos[j]._id.toString() === req.body.video_id) videoFound = true;
            j++;
          }
          i++;
        }

        if (videoFound) {
          if ((typeof req.body.video_id !== "undefined") && (req.body.video_id !== null)) {
            Videos.deleteOne({_id: req.body.video_id}, (err, resp) => {
              if (err) return sendError(res, err);
              return sendMessage(res, resp);
            });
          }
        }
        else {
          sendError(res, "User doesn't have the right to delete this video");
        }
      }
      else {
        sendError(res, "User doesn't exists");
      }
    }
    else {
      sendError(res, "Missing Required Fields");
    }
  }
}
module.exports = DeleteVideo;
