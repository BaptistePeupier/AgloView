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
const CreatePlaylist = require("./api/routes/Playlist/CreatePlaylist");
const ReadPlaylist = require("./api/routes/Playlist/ReadPlaylist");
const UpdatePlaylist = require("./api/routes/Playlist/UpdatePlaylist");
const DeletePlaylist = require("./api/routes/Playlist/DeletePlaylist");
app.post('/playlist', (req, res) => CreatePlaylist(req, res));
app.get('/playlist', (req, res) => ReadPlaylist(req, res));
app.put('/playlist', (req, res) => UpdatePlaylist(req, res));
app.delete('/playlist', (req, res) => DeletePlaylist(req, res));

// For Video
const CreateVideo = require("./api/routes/Video/CreateVideo");
const ReadVideo = require("./api/routes/Video/ReadVideo");
const DeleteVideo = require("./api/routes/Video/DeleteVideo");
app.post('/video', (req, res) => CreateVideo(req, res));
app.get('/video', (req, res) => ReadVideo(req, res));
app.delete('/video', (req, res) => DeleteVideo(req, res));

// For Annonce
const CreateAnnonce = require("./api/routes/Annonce/CreateAnnonce");
const ReadAnnonce = require("./api/routes/Annonce/ReadAnnonce");
const UpdateAnnonce = require("./api/routes/Annonce/UpdateAnnonce");
const DeleteAnnonce = require("./api/routes/Annonce/DeleteAnnonce");
const GetAnnonceForUser = require("./api/routes/Annonce/GetAnnonceForUser");
app.post('/annonce', (req, res) => CreateAnnonce(req, res));
app.get('/annonce', (req, res) => ReadAnnonce(req, res));
app.put('/annonce', (req, res) => UpdateAnnonce(req, res));
app.delete('/annonce', (req, res) => DeleteAnnonce(req, res));

app.get('/getAnnonceForUser', (req, res) => GetAnnonceForUser(req, res));

const Logout = require("./api/Outils/Logout");
app.post('/logout', (req, res) => Logout(req, res));

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

