const Annonceurs = require("../../Outils/Schema/Annonceurs")
const {sendMessage, sendError} = require("../../Outils/helper");
const {isAdmin} = require("../../Outils/auth");

//
async function ReadAllAnnonceurs(req, res) {
  if (isAdmin(req, res)) {
    Annonceurs.find({}, (err, resp) => {
        if(err) return sendError(res, err);
        else {
          for (let i = 0; i < resp.length; i++) {
            resp[i].password = "";
            resp[i].salt = "";
          }
          return sendMessage(res, resp);
        }
      });
  }
}
module.exports = ReadAllAnnonceurs;

