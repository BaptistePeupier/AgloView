const Annonces = require("../../Outils/Schema/Annonces");
const Annonceurs = require("../../Outils/Schema/Annonceurs");
const {getUserID, isAnnonceur} = require("../../Outils/auth");
const {sendError, sendMessage} = require("../../Outils/helper");

async function CreateAnnonce(req, res) {
  if (isAnnonceur(req, res)) {
    // Check fields.
    if (
      (typeof req.body.title !== 'undefined') && (req.body.title !== null) &&
      (typeof req.body.text !== 'undefined') && (req.body.text !== null) &&
      (typeof req.body.tags !== 'undefined') && (req.body.tags instanceof Array)
    ) {
      // Create the Annonce
      req.body.tags = req.body.tags.map(tag => tag.toLowerCase());  // Lowercase tag to facilitate search with user's tag.
      const newAnnonce = new Annonces({title: req.body.title, text: req.body.text, tags: req.body.tags, nb_vues: 0, total_tmp_vue: []});
      const newAnnonceRegistered = await newAnnonce.save();

      // Add it to the Annonceur
      const annonceur = await Annonceurs.findOne({_id: getUserID(req)});
      annonceur.annonces.push(newAnnonceRegistered._id);

      Annonceurs.updateOne({_id: getUserID(req)},{annonces: annonceur.annonces}, (err, resp) => {
        if (err) return sendError(res, err);
        return sendMessage(res, {_id: newAnnonceRegistered._id});
      });
    }
    else {
      sendError(res, "Missing required fields");
    }
  }
}
module.exports = CreateAnnonce;

