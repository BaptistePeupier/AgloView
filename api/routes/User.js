const {client} = require("../Outils/configBDD");
const {sendMessage, sendError} = require("../Outils/helper");

//
async function CreateUser(req, res) {
    client.connect(err => {
      const userCollection = client.db("AgloView").collection("user");
      const newUserDoc = {
        name:       req.body.name,
        firstName:  req.body.firstName,
        login:      req.body.login,
        mdp:        req.body.mdp,
        salt:       req.body.salt
      }

      userCollection.insertOne(newUserDoc).then(
        dbRes => {
          if (dbRes.acknowledged) {
            newUserDoc.id = res.insertedId;
            sendMessage(res, newUserDoc)
          }
          else {
            sendError(res, "Can not create user")
          }
        }
      );
    });

  client.close().then();
}

//
async function ReadUser(req, res) {

}

//
async function UpdateUser(req, res) {

}

//
async function DeleteUser(req, res) {

}

module.exports = {CreateUser, ReadUser, UpdateUser, DeleteUser};
