const Annonces = require("../../Outils/Schema/Annonces")
const {isUser} = require("../../Outils/auth");

async function GetAnnonceForUser(req, res) {
  if (isUser(req, res)){

  }
}
module.exports = GetAnnonceForUser;
