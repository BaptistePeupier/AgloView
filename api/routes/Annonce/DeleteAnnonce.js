const Annonceurs = require("../../Outils/Schema/Annonceurs")
const Annonces = require("../../Outils/Schema/Annonces")
const {getUserID, isAnnonceur, getSession} = require("../../Outils/auth");
const {sendError, sendMessage} = require("../../Outils/helper");

async function DeleteAnnonce(req, res) {
  if (
    (getSession(req).userInfo.role === "admin") ||
    (isAnnonceur(req, res))
  ){
    if ((typeof req.body._id !== 'undefined') && (req.body._id !== null)) {
      // Check if the Annonceur own the Annonce
      let annonceur = await Annonceurs.findOne({_id: getUserID(req)});
      if (
        (getSession(req).userInfo.role === "admin") ||
        (annonceur !== null)
      ) {
        let annonce;
        if (annonceur !== null) annonce = annonceur.annonces.filter(annonce => annonce._id.toString() === req.body._id)[0];
        // If the admin is deleting the Annonce, we need to get the Annonceur.
        else if (
          (getSession(req).userInfo.role === "admin") &&
          (typeof req.body.annonceur_id !== 'undefined') && (req.body.annonceur_id !== null)
        ) {
          annonceur = await Annonceurs.findOne({_id: req.body.annonceur_id});
        }
        else {
          return sendError(res, "This Annonce isn't attached to an Annonceur");
        }

        if (
          (getSession(req).userInfo.role === "admin") ||
          (typeof annonce !== 'undefined')
        ) {
          const annonce = await Annonces.findOne({_id: req.body._id});

          if (annonce !== null) {
            // Remove Annonce from its Annonceur.
            annonceur.annonces = annonceur.annonces.filter(annonce => annonce._id.toString() !== req.body._id);
            const deletedAnnonce = await Annonceurs.updateOne({_id: getUserID(req)}, {annonces: annonceur.annonces})

            if (deletedAnnonce.acknowledged) {
              // Delete the Annonce
              Annonces.deleteOne({_id: req.body._id}, (err, resp) => {
                if (err) return sendError(res, err);
                return sendMessage(res, resp);
              });
            }
            else {
              sendError(res, "Annonce doesn't exists");
            }
          }
          else {
            sendError(res, "Annonce doesn't exists");
          }
        }
        else {
          sendError(res, "You don't have the permission to access this Annonce");
        }
      }
      else {
        sendError(res, "Annonceur doesn't exists");
      }
    }
    else {
      sendError(res, "Missing required fields");
    }
  }
}
module.exports = DeleteAnnonce;
