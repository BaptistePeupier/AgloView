const connection = require("../connection");
const express = require('express');
const router = express.Router();

module.exports = router;

router.post('/api/login/', (req, res, next) => {

  // use this to get a hashed password
  // let rounds = 10
  // bcrypt.hash('abc123', rounds).then(function(hash) {
  //     console.log(hash)
  // });

  if (!req.body.email || !req.body.password) {
    return res.status(500).send('Missing Body')
  }

  const email = req.body.email.toLowerCase()
  const password = req.body.password
  const bcrypt = require('bcrypt');
  const query = "SELECT id, password FROM user WHERE email = '"+email+"';"

  connection.query(query, null, (err, result) => {
      if (err) {
        return res.status(500).send('Failed to SELECT from database')
      } else {
        if (result.length == 1 && result[0].password && bcrypt.compareSync(password, result[0].password)) {
          const hat = require('hat');
          const token = hat();
          const update = "UPDATE user SET token = '"+token+"' WHERE id = "+result[0].id+" LIMIT 1;";
          connection.query(update, (updateerr, updateresult) => {
            if (updateerr) {
              return res.status(500).send('Failed to UPDATE database')
            } else {
              const response = { 'success': true, 'token': token }
              return res.json(response);
            }
          });
        } else {
          return res.status(500).send('Failure')
        }
      }
  });
})
