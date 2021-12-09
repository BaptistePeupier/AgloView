const mongoose = require('mongoose');

const uri = "mongodb+srv://AgloView:AgloView@agloviewdbcluster.9aqwm.mongodb.net/AgloView?retryWrites=true&w=majority";
const options = {useNewUrlParser: true, useUnifiedTopology: true};

module.exports.database = mongoose.createConnection(uri, options);

