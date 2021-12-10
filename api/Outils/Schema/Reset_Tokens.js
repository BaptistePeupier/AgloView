const mongoose = require('mongoose');
const {database} = require("../configBDD");
const Schema = mongoose.Schema ;

const SchemaResetToken = Schema({
  email: String,
  token: String
});
module.exports = database.model('reset_tokens', SchemaResetToken );
