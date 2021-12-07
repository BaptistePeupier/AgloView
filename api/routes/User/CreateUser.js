const {client} = require("../../Outils/configBDD");
const {sendMessage, sendError, isValidPassword} = require("../../Outils/helper");
const crypto = require("crypto");
const pbkdf2 = require("pbkdf2/lib/sync");
const {isAdmin} = require("../../Outils/auth");

// Create a new User.
// Can not creat if email is already used.
// Check strength of the password.
// Hash and salt the password before storing it.
async function CreateUser(req, res) {
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
        await client.connect();

        // Connect to the USER collection.
        const userCollection = client.db("AgloView").collection("user");

        // Check if a user doesn't use the passed email.
        const userAlreadyExist = await userCollection.findOne({email: req.body.email});
        if (userAlreadyExist === null) {

          // Construct Salt and Password Hash
          let salt = crypto.randomBytes(32).toString('hex');
          let passwordHash = pbkdf2(req.body.password, salt, 1000, 32, 'sha256').toString('hex');

          const newUserDoc = {
            pseudo: req.body.pseudo,
            age: req.body.age,
            email: req.body.email,
            tags: {},
            password: passwordHash,
            salt: salt
          }

          // Create the new User.
          userCollection.insertOne(newUserDoc).then(dbRes => {
              if (dbRes.acknowledged) {
                newUserDoc.id = res.insertedId;
                delete newUserDoc.password;
                delete newUserDoc.salt;
                sendMessage(res, newUserDoc)
              }
              else {
                sendError(res, "Can not create user")
              }

              // Request ends, close DB connection.
              client.close().then();
            }
          );
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
}
module.exports = CreateUser;
