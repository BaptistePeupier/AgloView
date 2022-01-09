const Admins = require("../../Outils/Schema/Admins")
const {sendMessage, sendError} = require("../../Outils/helper");
const {isAdmin} = require("../../Outils/auth");

//
async function ReadAdmin(req, res) {
  // Check fields.
  if (
    (typeof req.query.email !== 'undefined') && (req.query.email !== null) &&
    (typeof req.query._id !== 'undefined') && (req.query._id !== null)
  ) {
    if (isAdmin(req, res)) {
      Admins.findOne({_id: req.query._id, email: req.query.email}, (err, resp) => {
          if(err) return sendError(res, err);
          if(resp === null) return sendError(res, "Admin doesn't exist");
          else {
            resp.password = "";
            resp.salt = "";
            return sendMessage(res, resp);
          }
        });
    }
  }
  else {
    sendError(res, "Missing required fields");
  }
}
module.exports = ReadAdmin;

