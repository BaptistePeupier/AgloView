const Playlists = require("../../Outils/Schema/Playlists");
const {isUser, getUserID} = require("../../Outils/auth");
const {sendError} = require("../../Outils/helper");
const Users = require("../../Outils/Schema/User");
const ReadPlaylist = require("./ReadPlaylist");

async function UpdatePlaylist(req, res) {
  if (isUser(req, res)) {
    // Check fields.
    if (
      (typeof req.body.playlist_id !== 'undefined') && (req.body.playlist_id !== null) &&
      (typeof req.body.name !== 'undefined') && (req.body.name !== null)
    ) {
      // Check if the User own the Playlist
      const user = await Users.findOne({_id: getUserID(req)});
      const playlist = user.playlists.filter(playlist => playlist._id.toString() === req.body.playlist_id)[0];

      if (typeof playlist !== 'undefined') {
        // Update playlist's name
        Playlists.updateOne({_id: req.body.playlist_id},{name: req.body.name}, (err, resp) => {
          if (err) return sendError(res, err);
          ReadPlaylist(req, res);
        })
      }
      else {
        sendError(res, "You don't have the permission to access this Playlist");
      }
    }
    else {
      sendError(res, "Missing required fields");
    }
  }
}
module.exports = UpdatePlaylist;
