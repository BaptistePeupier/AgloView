const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://AgloView:AgloView@agloviewdbcluster.9aqwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const options = {useNewUrlParser: true, useUnifiedTopology: true};

const client = new MongoClient(uri, options);

module.exports.urlBDD = uri
module.exports.configConnexion = options;
module.exports.client = client;

