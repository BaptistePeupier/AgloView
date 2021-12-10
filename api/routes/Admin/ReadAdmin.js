const Admins = require("../../Outils/Schema/Admins")
const {sendMessage, sendError} = require("../../Outils/helper");
const {isAdmin} = require("../../Outils/auth");

//
async function ReadAdmin(req, res) {
  // Check fields.
  if (
    (typeof req.body.email !== 'undefined') && (req.body.email !== null) &&
    (typeof req.body._id !== 'undefined') && (req.body._id !== null)
  ) {
    if (isAdmin(req, res)) {
      Admins.findOne({_id: req.body._id, email: req.body.email}, (err, resp) => {
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

