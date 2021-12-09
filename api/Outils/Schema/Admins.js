const mongoose = require('mongoose');
const {database} = require("../configBDD");
const Schema = mongoose.Schema ;

const SchemaAdmin = Schema({
  pseudo: String,
  age: Number,
  email: String,
  password: String,
  salt: String
});
module.exports = database.model('admins', SchemaAdmin);
