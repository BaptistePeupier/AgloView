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

// add more endpoints by copying this pattern
app.use(require('./api/routes/email'))
require('./api/routes/email')

app.use(require('./api/routes/list'))
require('./api/routes/list')

app.use(require('./api/routes/login'))
require('./api/routes/login')

app.use(require('./api/routes/register'))
require('./api/routes/register')

// Start the api on port 8080
app.listen(process.env.PORT || 8080)

console.log("API is running at http://localhost:8080")
