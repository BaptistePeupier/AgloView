const Admins = require("../../Outils/Schema/Admins")
const {sendMessage, sendError} = require("../../Outils/helper");
const {isAdmin} = require("../../Outils/auth");

//
async function ReadAllAdmins(req, res) {
  if (isAdmin(req, res)) {
    Admins.find({}, (err, resp) => {
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
module.exports = ReadAllAdmins;

