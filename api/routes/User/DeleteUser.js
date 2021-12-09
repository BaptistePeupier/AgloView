const Users = require("../../Outils/Schema/User")
const {sendMessage, sendError} = require("../../Outils/helper");
const {getUserID, isAdmin, getSession} = require("../../Outils/auth");

//
async function DeleteUser(req, res) {
  // Check fields.
  if (
    (typeof req.body.email !== 'undefined') && (req.body.email !== null) &&
    (typeof req.body._id !== 'undefined') && (req.body._id !== null)
  ) {
    if ((getSession(req).userInfo.role === "admin") || (getUserID(req) === req.body._id)) {
      const userToDelete = await Users.findOne({_id: req.body._id, email: req.body.email});

      if (userToDelete !== null) {
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
