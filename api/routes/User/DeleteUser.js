const Users = require("../../Outils/Schema/User")
const Playlists = require("../../Outils/Schema/Playlists")
const Videos = require("../../Outils/Schema/Videos")
const {sendMessage, sendError} = require("../../Outils/helper");
const {getUserID, getSession} = require("../../Outils/auth");

//
async function DeleteUser(req, res) {
  // Check fields.
  if (
    (typeof req.body.email !== 'undefined') && (req.body.email !== null) &&
    (typeof req.body._id !== 'undefined') && (req.body._id !== null)
  ) {
    if (
      (getSession(req).userInfo.role === "admin") ||
      ((getUserID(req) === req.body._id)) && (getSession(req).userInfo.role === "user")
    ) {
      const userToDelete = await Users.findOne({_id: req.body._id, email: req.body.email});

      if (userToDelete !== null) {
        // Delete all Playlist and Videos linked to that User
        for (let i = 0; i < userToDelete.playlists.length ; i++) {
          for (let j = 0; j < userToDelete.playlists[i].length ; j++) {
            await Videos.deleteOne({_id: userToDelete.playlists[i].videos[j]._id});
          }
          await Playlists.deleteOne({_id: userToDelete.playlists[i]._id});
        }

        Users.deleteOne({_id: req.body._id, email: req.body.email},(err, resp) => {
          if(err) return sendError(res, err);
          return sendMessage(res, resp);
        });
      }
      else {
        sendError(res, "User don't exists");
      }
    }
    else {
      sendError(res, "You don't have the right to delete that user's account");
    }
  }
  else {
    sendError(res, "Missing required fields");
  }
}
module.exports = DeleteUser;

