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
const ReadAllUsers = require('./api/routes/User/ReadAllUsers');
app.post('/user', (req, res) => CreateUser(req, res));
app.get('/user', (req, res) => ReadUser(req, res));
app.put('/user', (req, res) => UpdateUser(req, res));
app.delete('/user', (req, res) => DeleteUser(req, res));

app.post('/loginUser', (req, res) => LoginUser(req, res))

app.get('/users', (req, res) => ReadAllUsers(req, res));

// For Annonceur
const CreateAnnonceur = require("./api/routes/Annonceur/CreateAnnonceur");
const ReadAnnonceur = require('./api/routes/Annonceur/ReadAnnonceur');
const UpdateAnnonceur = require('./api/routes/Annonceur/UpdateAnnonceur');
const DeleteAnnonceur = require('./api/routes/Annonceur/DeleteAnnonceur');
const LoginAnnonceur = require("./api/routes/Annonceur/LoginAnnonceur");
const ReadAllAnnonceurs = require('./api/routes/Annonceur/ReadAllAnnonceurs');
app.post('/annonceur', (req, res) => CreateAnnonceur(req, res));
app.get('/annonceur', (req, res) => ReadAnnonceur(req, res));
app.put('/annonceur', (req, res) => UpdateAnnonceur(req, res));
app.delete('/annonceur', (req, res) => DeleteAnnonceur(req, res));

app.post('/loginAnnonceur', (req, res) => LoginAnnonceur(req, res))

app.get('/annonceurs', (req, res) => ReadAllAnnonceurs(req, res));

// For Admin
const CreateAdmin = require("./api/routes/Admin/CreateAdmin");
const ReadAdmin = require('./api/routes/Admin/ReadAdmin');
const UpdateAdmin = require('./api/routes/Admin/UpdateAdmin');
const DeleteAdmin = require('./api/routes/Admin/DeleteAdmin');
const LoginAdmin = require("./api/routes/Admin/LoginAdmin");
const ReadAllAdmins = require('./api/routes/Admin/ReadAllAdmins');
app.post('/admin', (req, res) => CreateAdmin(req, res));
app.get('/admin', (req, res) => ReadAdmin(req, res));
app.put('/admin', (req, res) => UpdateAdmin(req, res));
app.delete('/admin', (req, res) => DeleteAdmin(req, res));

app.post('/loginAdmin', (req, res) => LoginAdmin(req, res))

app.get('/admins', (req, res) => ReadAllAdmins(req, res));

// For Playlist


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

