const mongoose = require('mongoose');
const {database} = require("../configBDD");
const Schema = mongoose.Schema ;

const SchemaPlaylist = Schema({
  nom: String,
  videos: [{ type: Schema.Types.ObjectId, ref: 'videos' }]
});
module.exports = database.model('playlists', SchemaPlaylist );
