const mongoose = require('mongoose');
const {database} = require("../configBDD");
const Schema = mongoose.Schema ;

const SchemaUser = Schema({
  pseudo: String,
  age: Number,
  email: String,
  tags: [{
    tag: String,
    rank: Number
  }],
  password: String,
  salt: String,
  playlists: [{ type: Schema.Types.ObjectId, ref: 'playlists' }]
});
module.exports = database.model('users', SchemaUser );
