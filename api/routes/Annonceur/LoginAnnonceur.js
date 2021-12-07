const {sendMessage, sendError} = require('../../Outils/helper');
const auth = require('../../Outils/auth');
const {client} = require("../../Outils/configBDD");
const pbkdf2 = require("pbkdf2/lib/sync");

// Parameters :
//  + req, the data passed by the request with 2 fields in its body :
//      - email
//      - password
//  + res, the data returned :
//      - if no problems: status ok, the id of the user and its name
//      - if problems: status error and the reason of it
// This function check if the login's information are rights and if it is, set a cookie with the user id that is used to
// guaranty identification of the user in all the web application.
async function LoginAnnonceur (req, res) {

  let passwordHash;
  if (
    (typeof req.body.email !== 'undefined') && (req.body.email !== null) &&
    (typeof req.body.password !== 'undefined') && (req.body.password !== null)
  ) {
    await client.connect();
    const userCollection = client.db("AgloView").collection("annonceur");

    // Retrieve user's salt for password check
    let salt = (await userCollection.findOne({email: req.body.email}));

    if (salt !== null) {
      salt = salt.salt

      passwordHash = pbkdf2(req.body.password, salt, 1000, 32, 'sha256').toString('hex');
      let userLogged = await userCollection.findOne({
        email: req.body.email,
        password: passwordHash,
        salt: salt
      });

      client.close().then();

      console.log(userLogged)
      if (userLogged !== null) {

        // Set user's session when login is checked & valid.
        auth.setSessionCookie(req, res, {
          userID: userLogged._id,
          role: "annonceur"
        });

        sendMessage(res, userLogged);
      } else {
        sendError(res, "Invalid Email or PSW");
      }
    } else {
      sendError(res, "Invalid Email or PSW");
    }
  } else {
    sendError(res, "Email or PSW missing");
  }
}
module.exports = LoginAnnonceur;

