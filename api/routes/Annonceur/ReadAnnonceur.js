const Annonceurs = require("../../Outils/Schema/Annonceurs")
const Annonces = require("../../Outils/Schema/Annonces")
const {sendMessage, sendError} = require("../../Outils/helper");
const {getSession, getUserID} = require("../../Outils/auth");

//
async function ReadAnnonceur(req, res) {
  // Check fields.
  if (
    (typeof req.query.email !== 'undefined') && (req.query.email !== null) &&
    (typeof req.query._id !== 'undefined') && (req.query._id !== null)
  ) {
    if (
      (getSession(req).userInfo.role === "admin") ||
      ((getUserID(req) === req.query._id)) && (getSession(req).userInfo.role === "annonceur")
    ) {
      Annonceurs.findOne({_id: req.query._id, email: req.query.email}, async (err, resp) => {
        if (err) return sendError(res, err);
        if (resp === null) return sendError(res, "Annonceur doesn't exist");
        else {
          resp.password = "";
          resp.salt = "";
          resp.annonces = await Annonces.find({_id: {$in: resp.annonces}});
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
