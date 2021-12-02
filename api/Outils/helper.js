// Return data form the backend when there is no error
// To send messages in JSON format, we need to pass is as res' parameter.
// This parameter is a JavaScript Object
function sendMessage(res, data) {
  res.json( {status: 'ok', data: data} );
}

// Return error from the backend and give information about it
function sendError (res, reason) {
  res.json( {status: 'error', data: {reason: reason}} );
}

// To check a password:
//      + a least 8 characters
//      + contain at least:
//          - one lowercase letter
//          - one uppercase letter
//          - one numeric digit
//          - and one special character
function isValidPassword(password) {
  let code = false;

  if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/)) {
    code = true
  }

  return code;
}

module.exports = {sendMessage, sendError, isValidPassword};

