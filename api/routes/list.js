const connection = require("../connection");
const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/api/list', (req, res, next) => {
  // let json = [{id: 1, value: 'dog'},{id:2, value: 'cat'}]
  // return res.json(json)
  // res.header('Access-Control-Allow-Origin', '*')
  const query = "SELECT * FROM test ORDER BY value;";
  connection.query(query, null, (err, result) => {
      if (err) {
          console.log(err);
          return res.status(500).send('Failed to GET from database')
      } else {
          console.log(result)
          return res.json(result);
      };
  });
})

  router.post('/api/list/', (req, res, next) => {
    const query = "INSERT INTO test SET value = '"+req.body.testinput+"';"
    connection.query(query, null, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Failed to POST to database: ' + req.body.testinput)
        } else {
            // console.log(result)
            return res.json(result);
        };
    });
  })
