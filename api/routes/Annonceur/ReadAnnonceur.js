const Annonceurs = require("../../Outils/Schema/Annonceurs")
const {sendMessage, sendError} = require("../../Outils/helper");
const {getSession, getUserID} = require("../../Outils/auth");

//
async function ReadAnnonceur(req, res) {
  // Check fields.
  if (
    (typeof req.body.email !== 'undefined') && (req.body.email !== null) &&
    (typeof req.body._id !== 'undefined') && (req.body._id !== null)
  ) {
    if (
      (getSession(req).userInfo.role === "admin") ||
      ((getUserID(req) === req.body._id)) && (getSession(req).userInfo.role === "annonceur")
    ) {
      Annonceurs.findOne({_id: req.body._id, email: req.body.email}, (err, resp) => {
          if(err) return sendError(res, err);
          if(resp === null) return sendError(res, "Annonceur doesn't exist");
          else {
            resp.password = "";
            resp.salt = "";
            return sendMessage(res, resp);
          }
        });
    }
    else {
      sendError(res, "You don't have the right to view that annonceur's account");
    }
  }
  else {
    sendError(res, "Missing required fields");
  }
}
module.exports = ReadAnnonceur;
