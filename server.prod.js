const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

app.use(bodyParser.json())

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


//
//
app.get('/*all', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

//
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/AloView/'));

//
//
app.get('/*', function(req,res) {

//
//
res.sendFile(path.join(__dirname+'/dist/AloView/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
