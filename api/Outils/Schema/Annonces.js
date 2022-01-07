const mongoose = require('mongoose');
const {database} = require("../configBDD");
const Schema = mongoose.Schema ;

const SchemaAnnonce = Schema({
  title: String,
  text: String,
  tags: [String],
  nb_vues: Number,
  total_tmp_vue: [Number]
});
module.exports = database.model('annonces', SchemaAnnonce );
