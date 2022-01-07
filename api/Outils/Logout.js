const {sendMessage} = require("./helper");

// Parameters :
//  + req, the data passed by the request (body is empty here).
//  + res, the data returned : here used to "delete" the SESSIONID cookie.
// This function disconnect the user by "deleting" its SESSIONID cookie.
// It delete the value of the cookie so it's no more a sensitive data and the user can't have access to backend's functions until he re-log itself.

async function Logout (req, res) {
  res.cookie('SESSIONID', '', {httpOnly:true, secure:true});

  sendMessage(res, 'Cookies deleted');
}

module.exports = Logout;
