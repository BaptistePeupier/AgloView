const Playlists = require("../../Outils/Schema/Playlists");
const Users = require("../../Outils/Schema/User");
const {isUser, getUserID} = require("../../Outils/auth");
const {sendError, sendMessage} = require("../../Outils/helper");

async function CreatePlaylist(req, res) {
  if (isUser(req, res)) {
    // Check fields.
    if ((typeof req.body.name !== 'undefined') && (req.body.name !== null)) {
      // Create the Playlist
      const newPlaylist = new Playlists({name: req.body.name, videos: []});
      const newPlaylistRegistered = await newPlaylist.save();

      // Add it to the User
      const user = await Users.findOne({_id: getUserID(req)});
      user.playlists.push(newPlaylistRegistered._id);

      Users.updateOne({_id: getUserID(req)},{playlists: user.playlists}, async (err, resp) => {
        if (err) return sendError(res, err);
        return sendMessage(res, {_id: newPlaylistRegistered._id});
      })
    }
    else {
      sendError(res, "Missing required fields");
    }
  }
}
module.exports = CreatePlaylist;

