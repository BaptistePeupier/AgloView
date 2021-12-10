const sessionJWT = require('./sessionJWT');
const {sendError} = require('./helper');

// Retrieve cookie session JWT's content
function getSession(req) {
    return sessionJWT.decodeSessionCookie(req);
}
module.exports.getSession = getSession;

// Add session cookie to messages' headers
function setSessionCookie(req, res, session) {
    sessionJWT.createSessionCookie(req, res, session)
}
module.exports.setSessionCookie = setSessionCookie;

// Retrieve userID from the session cookie if it exist,
// If not, return -1.
function getUserID(req) {
    const session = getSession(req);

    if ((typeof session.userInfo === 'undefined') || (session.userInfo === -1)) return -1;
    return session.userInfo.userID;
}
module.exports.getUserID = getUserID;

function isLogged(req, res) {
  if (getUserID(req) !== -1) {
    // Refresh session cookie
    setSessionCookie(req, res, getSession(req).userInfo);

    return true;
  }
  else {
    sendError(res, 'User not logged');
    return false;
  }
}
module.exports.isLogged = isLogged;

// Check if the user is logged and then return true.
// If not, inform that the user isn't logged
function isUser (req, res) {
  if ((getUserID(req) !== -1) && (getSession(req).userInfo.role === "user")) {
      // Refresh session cookie
      setSessionCookie(req, res, getSession(req).userInfo);

      return true;
  }
  else {
      sendError(res, 'Can not do this operation: user is not an user');
      return false;
  }
}
module.exports.userLogged = isUser;

// Check if the user is and admin or not.
// If not, inform that the user isn't an admin.
// First, check if the user is logged.
function isAnnonceur (req, res) {
  if ((getUserID(req) !== -1) && (getSession(req).userInfo.role === "annonceur")) {
          return true;
      }
  else {
      sendError(res, 'Can not do this operation: user is not an annonceur');
      return false;
  }
}
module.exports.isAnnonceur = isAnnonceur;

// Check if the user is and admin or not.
// If not, inform that the user isn't an admin.
// First, check if the user is logged.
function isAdmin (req, res) {
  if ((getUserID(req) !== -1) && (getSession(req).userInfo.role === "admin")) {
          return true;
      }
  else {
      sendError(res, 'Can not do this operation: user is not an admin');
      return false;
  }
}
module.exports.isAdmin = isAdmin;
