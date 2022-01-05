const Users = require("../../Outils/Schema/User")
const Playlists = require("../../Outils/Schema/Playlists")
const Videos = require("../../Outils/Schema/Videos")
const {isUser, getUserID} = require("../../Outils/auth");
const {sendError, sendMessage} = require("../../Outils/helper");

async function DeletePlaylist(req, res) {
  if (isUser(req, res)){
    if ((typeof req.body.playlist_id !== 'undefined') && (req.body.playlist_id !== null)) {

      // Check if the User own the Playlist
      const user = await Users.findOne({_id: getUserID(req)});
      const playlist = user.playlists.filter(playlist => playlist._id.toString() === req.body.playlist_id)[0];

      if (typeof playlist !== 'undefined') {
        const playlist = await Playlists.findOne({_id: req.body.playlist_id});
        if (playlist !== null) {

          // Delete all videos linked to the playlist
          await Videos.deleteMany({_id: {$in:playlist.videos}});

          // Remove Playlist from User
          const currentUser = await Users.findOne({_id: getUserID(req)})
          if (currentUser !== null) {
            currentUser.playlists = currentUser.playlists.filter(playlist => playlist.toString() !== req.body.playlist_id);
            await Users.updateOne({_id: getUserID(req)},{playlists: currentUser.playlists});

            // Delete Playlist
            Playlists.deleteOne({_id: req.body.playlist_id}, (err, resp) => {
              if(err) return sendError(res, err);
              return sendMessage(res, resp);
            });
          }
          else {
            sendError(res, "User doesn't exists");
          }
        }
        else {
          sendError(res, "Playlist doesn't exists");
        }
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
module.exports = DeletePlaylist;
