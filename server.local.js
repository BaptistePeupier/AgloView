const {client} = require("./api/Outils/configBDD");

const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express()

app.use(bodyParser.json())
app.use(cookieParser());

// allow CORS when running locally
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  next()
})

// Routes
// For User
const CreateUser = require('./api/routes/User/CreateUser');
const ReadUser = require('./api/routes/User/ReadUser');
const UpdateUser = require('./api/routes/User/UpdateUser');
const DeleteUser = require('./api/routes/User/DeleteUser');
const LoginUser = require("./api/routes/User/LoginUser");
app.post('/user', (req, res) => CreateUser(req, res));
app.get('/user', (req, res) => ReadUser(req, res));
app.put('/user', (req, res) => UpdateUser(req, res));
app.delete('/user', (req, res) => DeleteUser(req, res));
app.post('/loginUser', (req, res) => LoginUser(req, res))

// For Annonceur
const LoginAnnonceur = require("./api/routes/Annonceur/LoginAnnonceur");
app.post('/loginAnnonceur', (req, res) => LoginAnnonceur(req, res))

// For Admin
const LoginAdmin = require("./api/routes/Admin/LoginAdmin");
app.post('/loginAdmin', (req, res) => LoginAdmin(req, res))

// Start the api on port 8080
app.listen(process.env.PORT || 8080)

console.log("API is running at http://localhost:8080")
