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

// For Video
const CreateVideo = require("./api/routes/Video/CreateVideo");
app.get('/video', (req, res) => CreateVideo(req, res));

// Start the api on port 8080
app.listen(process.env.PORT || 8080)

console.log("API is running at http://localhost:8080")

