const mongoose = require('mongoose');
const {database} = require("../configBDD");
const Schema = mongoose.Schema ;

const SchemaVideo = Schema({
  link: String,
  title: String
});
module.exports = database.model('videos', SchemaVideo );
