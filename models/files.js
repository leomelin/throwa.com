var mongoose = require('mongoose')

/**
* Files -mongoose model schema description
*/
var FilesSchema = new mongoose.Schema({
  filename: String,
  folder: String,
  size: Number
})

module.exports = mongoose.model('Files', FilesSchema)
