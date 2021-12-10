const Users = require("../../Outils/Schema/User")
const {sendMessage, sendError, isValidPassword} = require("../../Outils/helper");
const crypto = require("crypto");
const pbkdf2 = require("pbkdf2/lib/sync");
const {getSession} = require("../../Outils/auth");

// Create a new User.
// Can not creat if email is already used.
// Check strength of the password.
// Hash and salt the password before storing it.
async function CreateUser(req, res) {
  if (getSession(req).userInfo.role !== "annonceur") {
    // Check fields.
    if (
      (typeof req.body.pseudo !== 'undefined') && (req.body.pseudo !== null) &&
      (typeof req.body.age !== 'undefined') && (req.body.age !== null) &&
      (typeof req.body.email !== 'undefined') && (req.body.email !== null) &&
      (typeof req.body.password !== 'undefined') && (req.body.password !== null)
    ) {
      // Check if the password is strong enough.
      if (isValidPassword(req.body.password)) {

        // Check if a user doesn't use the passed email.
        const userAlreadyExist = await Users.findOne({email: req.body.email});
        if (userAlreadyExist === null) {

          // Construct Salt and Password Hash
          let salt = crypto.randomBytes(32).toString('hex');
          let passwordHash = pbkdf2(req.body.password, salt, 1000, 32, 'sha256').toString('hex');

          // Create the new User.
          const newUser = new Users({
            pseudo: req.body.pseudo,
            age: req.body.age,
            email: req.body.email,
            tags: [],
            password: passwordHash,
            salt: salt,
            playlists : []
          });

          await newUser.save((err, resp) => {
            if(err) return sendError(res, err);
            resp.password = "";
            resp.salt = "";
            return sendMessage(res, resp);
          })

          }
          else {
            sendError(res, "Can not create user, a user with same email already exists")
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
  else {
    sendError(res, "Annonceur can not create users");
  }
}
module.exports = CreateUser;

