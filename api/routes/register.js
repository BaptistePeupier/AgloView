const connection = require("../connection");
const express = require('express');
const router = express.Router();

module.exports = router;

router.post('/api/register/', (req, res, next) => {
  if (!req.body.email || !req.body.password || (req.body.password !== req.body.password2)) {
    return res.status(500).send('Missing Body Data')
  }

  const email = req.body.email.toLowerCase()
  const password = req.body.password
  const bcrypt = require('bcrypt');

  const select = "SELECT id FROM user WHERE email = '"+email+"'";
  connection.query(select, null, (selecterr, selectresult) => {
    if (selecterr) {
      return res.status(500).send('Failed to SELECT from database Code 1480')
    } else {
      if (selectresult.length > 0) {
        return res.status(500).send('Failed to SELECT from database Code 1915')
      } else {
        // No existing account with same email address. Attempt to create a new account.
        bcrypt.hash(password, 10).then(function(hashedPassword) {
          const insert = "INSERT INTO user (email, password) VALUES ('"+email+"', '"+hashedPassword+"');"
          connection.query(insert, (inserterr, insertresult) => {
            if (inserterr) {
              return res.status(500).send('INSERT error')
            } else {
              return res.json({ id : insertresult.insertId })
            }
          }) // .query(insert ...)
        }) // bcrypt.hash(password ...)
      } // else (selectresult.length > 0)
    } // else (selecterr)
  }) // .query(select, null ...)
}) // router.post( ... )
