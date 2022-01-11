const Users = require("../../Outils/Schema/User")
const {sendMessage, sendError} = require("../../Outils/helper");
const {getSession, getUserID} = require("../../Outils/auth");

//
async function ReadUser(req, res) {
  // Check fields.
  if (
    (typeof req.query.email !== 'undefined') && (req.query.email !== null) &&
    (typeof req.query._id !== 'undefined') && (req.query._id !== null)
  ) {
    if (
      (getSession(req).userInfo.role === "admin") ||
      ((getUserID(req) === req.query._id)) && (getSession(req).userInfo.role === "user")
    ) {
      Users.findOne({_id: req.query._id, email: req.query.email}, (err, resp) => {
          if(err) return sendError(res, err);
          if(resp === null) return sendError(res, "User doesn't exist");
          else {
            resp.password = "";
            resp.salt = "";
            return sendMessage(res, resp);
          }
        });
    }
    else {
      sendError(res, "You don't have the right to view that user's account");
    }
  }
  else {
    sendError(res, "Missing required fields");
  }
}
module.exports = ReadUser;
