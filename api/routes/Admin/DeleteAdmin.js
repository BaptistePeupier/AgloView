const Admins = require("../../Outils/Schema/Admins")
const {sendMessage, sendError} = require("../../Outils/helper");
const {isAdmin} = require("../../Outils/auth");

//
async function DeleteUser(req, res) {
  // Check fields.
  if (
    (typeof req.body.email !== 'undefined') && (req.body.email !== null) &&
    (typeof req.body._id !== 'undefined') && (req.body._id !== null)
  ) {
    if (isAdmin(req, res)) {
      // Check if there are at least 2 admin (protection toward deletion of all admins: there must be at least one.
      const admins = await Admins.find({});
      if (admins.length >= 2) {
        const adminToDelete = await Admins.findOne({_id: req.body._id, email: req.body.email});

        if (adminToDelete !== null) {
          Admins.deleteOne({_id: req.body._id, email: req.body.email},(err, resp) => {
            if(err) return sendError(res, err);
            return sendMessage(res, resp);
          });
        }
        else {
          sendError(res, "Admin don't exists");
        }
      }
      else {
        sendError(res, "Could not delete this admin: there must be at least one admin remaining");
      }
    }
    else {
      sendError(res, "You don't have the right to delete that Admin's account");
    }
  }
  else {
    sendError(res, "Missing required fields");
  }
}
module.exports = DeleteUser;

