const Annoneurs = require("../../Outils/Schema/Annonceurs")
const {sendMessage, sendError, isValidPassword} = require("../../Outils/helper");
const {getSession, getUserID} = require("../../Outils/auth");
const crypto = require("crypto");
const pbkdf2 = require("pbkdf2/lib/sync");

//
async function UpdateAnnonceur(req, res) {
  // Check fields.
  if (
    (typeof req.body._id !== 'undefined') && (req.body._id !== null) &&
    (typeof req.body.pseudo !== 'undefined') &&
    (typeof req.body.email !== 'undefined') &&
    (typeof req.body.password !== 'undefined')
  ) {
    if (
      (getSession(req).userInfo.role === "admin") ||
      ((getUserID(req) === req.body._id)) && (getSession(req).userInfo.role === "annonceur")
    ) {
      let salt = "";

      const update = {
        email: req.body.email,
        pseudo: req.body.pseudo,
        age: req.body.age,
        salt: salt,
        password: req.body.password
      }

      if (req.body.email !== null) {
        // Check if an Annonceur doesn't use the passed email.
        const annonceurAlreadyExist = await Annoneurs.findOne({email: req.body.email}).where("_id").ne(getUserID(req));
        if (annonceurAlreadyExist !== null) {
          return sendError(res, "Can not update this annonceur with this email, a annonceur with same email already exists")
        }
      }
      else delete update.email;

      if (req.body.password !== null) {
        // Check if the password is strong enough.
        if (isValidPassword(req.body.password)) {
          // Construct Salt and Password Hash
          salt = crypto.randomBytes(32).toString('hex');
          req.body.password = pbkdf2(req.body.password, salt, 1000, 32, 'sha256').toString('hex');
          update.salt = salt;
          update.password = req.body.password;
        }
        else {
          return sendError(res, "Password isn't strong enough");
        }
      }
      else {
        delete update.password;
        delete update.salt;
      }

      if (req.body.age === null) delete update.age;
      if (req.body.pseudo === null) delete update.pseudo;

      Annoneurs.updateOne({_id: req.body._id}, update, (err, resp) => {
        if(err) return sendError(res, err);
        delete update.password;
        delete update.salt;
        return sendMessage(res, update);
      })
    }
    else {
      sendError(res, "You don't have the right to edit that annonceur's account");
    }
  }
  else {
    sendError(res, "Missing required fields");
  }
}
module.exports = UpdateAnnonceur;
