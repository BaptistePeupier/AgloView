const mongoose = require('mongoose');
const {database} = require("../configBDD");
const Schema = mongoose.Schema ;

const SchemaAnnonce = Schema({
  text: String,
  tags: [String],
  nb_vues: Number,
  tmp_moyen_vue: Number
});
module.exports = database.model('annonces', SchemaAnnonce );
