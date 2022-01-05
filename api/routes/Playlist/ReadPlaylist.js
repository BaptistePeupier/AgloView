const Users = require("../../Outils/Schema/User")
const Playlists = require("../../Outils/Schema/Playlists")
const Videos = require("../../Outils/Schema/Videos")
const {isUser, getUserID} = require("../../Outils/auth");
const {sendError, sendMessage} = require("../../Outils/helper");

async function ReadPlaylist(req, res) {
  if (isUser(req, res)){
    if ((typeof req.body.playlist_id !== 'undefined') && (req.body.playlist_id !== null)) {

      // Check if the User own the Playlist
      const user = await Users.findOne({_id: getUserID(req)});
      const playlist = user.playlists.filter(playlist => playlist._id.toString() === req.body.playlist_id)[0];

      if (typeof playlist !== 'undefined') {
        const playlist = await Playlists.findOne({_id: req.body.playlist_id});
        playlist.videos = await Videos.find({_id: {$in:playlist.videos}});

        sendMessage(res, playlist);
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
module.exports = ReadPlaylist;

