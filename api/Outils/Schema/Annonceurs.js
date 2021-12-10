const mongoose = require('mongoose');
const {database} = require("../configBDD");
const Schema = mongoose.Schema ;

const SchemaUser = Schema({
  pseudo: String,
  email: String,
  password: String,
  salt: String,
  annonces: [{ type: Schema.Types.ObjectId, ref: 'annonces' }]
});
module.exports = database.model('annonceurs', SchemaUser );
