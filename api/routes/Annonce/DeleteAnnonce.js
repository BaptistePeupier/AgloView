const Annonceurs = require("../../Outils/Schema/Annonceurs")
const Annonces = require("../../Outils/Schema/Annonces")
const {getUserID, isAnnonceur} = require("../../Outils/auth");
const {sendError, sendMessage} = require("../../Outils/helper");

async function DeleteAnnonce(req, res) {
  if (isAnnonceur(req, res)){
    if ((typeof req.body.annonce_id !== 'undefined') && (req.body.annonce_id !== null)) {

      // Check if the Annonceur own the Annonce
      const annonceur = await Annonceurs.findOne({_id: getUserID(req)});
      const annonce = annonceur.annonces.filter(annonce => annonce._id.toString() === req.body.annonce_id)[0];

      if (typeof annonce !== 'undefined') {
        const annonce = await Annonces.findOne({_id: req.body.annonce_id});

        if (annonce !== null) {
          // Remove Annonce from its Annonceur.
          annonceur.annonces = annonceur.annonces.filter(annonce => annonce._id.toString() !== req.body.annonce_id);
          const deletedAnnonce = await Annonceurs.updateOne({_id: getUserID(req)}, {annonces: annonceur.annonces})

          if (deletedAnnonce.acknowledged) {
            // Delete the Annonce
            Annonces.deleteOne({_id: req.body.annonce_id}, (err, resp) => {
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
      sendError(res, "Missing required fields");
    }
  }
}
module.exports = DeleteAnnonce;

