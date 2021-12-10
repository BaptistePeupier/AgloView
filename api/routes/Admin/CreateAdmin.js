const Admins = require("../../Outils/Schema/Admins")
const {sendMessage, sendError, isValidPassword} = require("../../Outils/helper");
const crypto = require("crypto");
const pbkdf2 = require("pbkdf2/lib/sync");
const {isAdmin} = require("../../Outils/auth");

// Create a new Admin.
// Can not creat if email is already used.
// Check strength of the password.
// Hash and salt the password before storing it.
async function CreateAdmin(req, res) {
  if (isAdmin(req, res)) {
    // Check fields.
    if (
      (typeof req.body.pseudo !== 'undefined') && (req.body.pseudo !== null) &&
      (typeof req.body.age !== 'undefined') && (req.body.age !== null) &&
      (typeof req.body.email !== 'undefined') && (req.body.email !== null) &&
      (typeof req.body.password !== 'undefined') && (req.body.password !== null)
    ) {
      // Check if the password is strong enough.
      if (isValidPassword(req.body.password)) {

        // Check if an Admin doesn't use the passed email.
        const userAlreadyExist = await Admins.findOne({email: req.body.email});
        if (userAlreadyExist === null) {

          // Construct Salt and Password Hash
          let salt = crypto.randomBytes(32).toString('hex');
          let passwordHash = pbkdf2(req.body.password, salt, 1000, 32, 'sha256').toString('hex');

          // Create the new Admin.
          const newAdmin = new Admins({
            pseudo: req.body.pseudo,
            age: req.body.age,
            email: req.body.email,
            password: passwordHash,
            salt: salt,
          });

          await newAdmin.save((err, resp) => {
            if(err) return sendError(res, err);
            resp.password = "";
            resp.salt = "";
            return sendMessage(res, resp);
          })

          }
          else {
            sendError(res, "Can not create Admin, an Admin with same email already exists")
          }
        }
       else {
         sendError(res, "Password isn't strong enough");
      }
    }
    else {
      sendError(res, "Missing required fields");
    }
  }
}
module.exports = CreateAdmin;
