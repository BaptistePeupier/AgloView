const {sendMessage, sendError} = require('../Outils/helper');
const auth = require('./auth');

// Parameters :
//  + req, the data passed by the request with 2 fields in its body :
//      - email
//      - password
//  + res, the data returned :
//      - if no problems: status ok, the id of the user and its name
//      - if problems: status error and the reason of it
// This function check if the login's information are rights and if it is, set a cookie with the user id that is used to
// guaranty identification of the user in all the web application.
async function loginUser (req, res) {
    if (
        (typeof req.body.email !== 'undefined') && (req.body.email !== null) &&
        (typeof req.body.password !== 'undefined') && (req.body.password !== null)
    ) {
        await client.connect();
        const userCollection = client.db("AgloView").collection("user");

        // Retrieve user's salt for password check
        const salt = (await userCollection.findOne({email: req.body.email})).salt;

        if (typeof salt !== null) {

            passwordHash = pbkdf2(req.body.password, salt, 1000, 32, 'sha256').toString('hex');
            let userLogged = await userCollection.findOne({
                email: req.body.email,
                password: passwordHash,
                salt: salt
            });

            client.close().then();

            if (typeof  userLogged[0] !== 'undefined') {
                // Set user's session when login is checked & valid.
                auth.setSessionCookie(req, res, {
                    userID: userLogged[0]["id_user"],
                    role: "user"
                });

                sendMessage(res, userLogged);
            }
            else {
                sendError(res, "Invalid Login or PSW");
            }
        }
        else {
            sendError(res, "Invalid Login or PSW");
        }
    }
    else {
        sendError(res, "Login or PSW missing");
    }
}
module.exports = loginUser;

