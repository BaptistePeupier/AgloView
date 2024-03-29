const Annonces = require("../../Outils/Schema/Annonces");
const Annonceurs = require("../../Outils/Schema/Annonceurs");
const {getUserID, isAnnonceur, getSession, isUser} = require("../../Outils/auth");
const {sendError, sendMessage} = require("../../Outils/helper");

async function UpdateAnnonce(req, res) {
  if(isUser(req, res)) {
    const annonce = await Annonces.findOne({_id: req.body._id});
    annonce.total_tmp_vue.push(req.body.tmp_vue);

    Annonces.updateOne({_id: annonce._id}, {total_tmp_vue: annonce.total_tmp_vue}, (err, resp) => {
      if (err) return sendError(res, err);
      return sendMessage(res, annonce);
    });
  }

  else if (
    (getSession(req).userInfo.role === "admin") ||
    (isAnnonceur(req, res))
  ) {
    // Check fields.
    if (
      (typeof req.body._id !== 'undefined') && (req.body._id !== null) &&
      (typeof req.body.title !== 'undefined') && (req.body.title !== null) &&
      (typeof req.body.text !== 'undefined') && (req.body.text !== null) &&
      (typeof req.body.tags !== 'undefined') && (req.body.tags instanceof Array) &&
      (typeof req.body.tmp_vue !== 'undefined')
    ) {
      // Check if the Annonceur own the Annonce
      const annonceur = await Annonceurs.findOne({_id: getUserID(req)});
      if (
        (getSession(req).userInfo.role === "admin") ||
        (annonceur !== null)
      ) {
        let annonce;
        if (annonceur !== null) annonce = annonceur.annonces.filter(annonce => annonce._id.toString() === req.body._id)[0];

        if (
          (getSession(req).userInfo.role === "admin") ||
          (typeof annonce !== 'undefined')
        ) {
          const annonce = await Annonces.findOne({_id: req.body._id});

          if (annonce !== null) {
            // Update the Annonce
            annonce.title = req.body.title;
            annonce.text = req.body.text;
            annonce.tags = req.body.tags;

            Annonces.updateOne({_id: req.body._id}, annonce, (err, resp) => {
              if (err) return sendError(res, err);
              return sendMessage(res, annonce);
            });
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
module.exports = UpdateAnnonce;
