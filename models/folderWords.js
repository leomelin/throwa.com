var mongoose = require('mongoose')

/**
* FolderWords -mongoose model schema description
*/
var FolderWordsSchema = new mongoose.Schema({
  word: String
})

module.exports = mongoose.model('FolderWords', FolderWordsSchema)
