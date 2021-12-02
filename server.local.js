const express = require('express');
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

// allow CORS when running locally
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  next()
})

// Routes
// For User
const {CreateUser, ReadUser, UpdateUser, DeleteUser} = require('./api/routes/User')
app.post('/user', (req, res) => CreateUser(req, res));
app.get('/user', (req, res) => ReadUser(req, res));
app.put('/user', (req, res) => UpdateUser(req, res));
app.delete('/user', (req, res) => DeleteUser(req, res));

// Start the api on port 8080
app.listen(process.env.PORT || 8080)

console.log("API is running at http://localhost:8080")

