const Annonceurs = require("../../Outils/Schema/Annonceurs")
const Annonces = require("../../Outils/Schema/Annonces");
const {sendMessage, sendError} = require("../../Outils/helper");
const {getUserID, getSession} = require("../../Outils/auth");

//
async function DeleteAnnonceur(req, res) {
  // Check fields.
  if (
    (typeof req.body.email !== 'undefined') && (req.body.email !== null) &&
    (typeof req.body._id !== 'undefined') && (req.body._id !== null)
  ) {
    if (
      (getSession(req).userInfo.role === "admin") ||
      ((getUserID(req) === req.body._id)) && (getSession(req).userInfo.role === "annonceur")
    ) {
      const annonceurToDelete = await Annonceurs.findOne({_id: req.body._id, email: req.body.email});

      if (annonceurToDelete !== null) {
        // Delete all Annonces linked to that Annonceur
        for (let i = 0; i < annonceurToDelete.annonces.length ; i++) {
          await Annonces.deleteOne({_id: annonceurToDelete.annonces[i]._id});
        }

        Annonceurs.deleteOne({_id: req.body._id, email: req.body.email},(err, resp) => {
          if(err) return sendError(res, err);
          return sendMessage(res, resp);
        });
      }
      else {
        sendError(res, "Annonceur don't exists");
      }
    }
    else {
      sendError(res, "You don't have the right to delete that annonceur's account");
    }
  }
  else {
    sendError(res, "Missing required fields");
  }
}
module.exports = DeleteAnnonceur;
