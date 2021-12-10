const Users = require("../../Outils/Schema/User")
const {sendMessage, sendError} = require("../../Outils/helper");
const {isAdmin} = require("../../Outils/auth");

//
async function ReadAllUsers(req, res) {
  if (isAdmin(req, res)) {
    Users.find({}, (err, resp) => {
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
module.exports = ReadAllUsers;

