var AWS = require('aws-sdk')
var express = require('express')
var router = express.Router()
var async = require('neo-async')

var config = require('../config')

var FilesModel = require('../models/files')
var FolderWordsModel = require('../models/folderWords')

var s3 = new AWS.S3({
  region: config.AWSRegion,
  secretAccessKey: config.AWSSecretKey,
  accessKeyId: config.AWSAccessKey
})

router.get('/folder', function (req, res, next) {
  FolderWordsModel.count(function (err, count) {
    if (err) {
      return next({
        status: 500,
        error: 'Error fetching folder name'
      })
    }

    var r
    var word1
    var word2

    var fetchNewFolderName = function (callback) {
      async.parallel([
        function (cb) {
          r = Math.floor(Math.random() * count)

          // Find random word from database
          FolderWordsModel.find({}).limit(1).skip(r).exec(function (err, data) {
            if (err) return cb(err)
            word1 = data[0].word
            cb()
          })
        },
        function (cb) {
          r = Math.floor(Math.random() * count)

          // Find another random word from database
          FolderWordsModel.find({}).limit(1).skip(r).exec(function (err, data) {
            if (err) return cb(err)

            // First letter to uppercase
            word2 = data[0].word.charAt(0).toUpperCase() + data[0].word.slice(1)
            cb()
          })
        }
      ], function (err) {
        if (err) return callback(err)

        // Check from FilesModel wether the randomized foldername already exists
        FilesModel.find({folder: word1 + word2}).exec(function (err, data) {
          if (err) return callback(err)

          // If folder already exists, fetch folder name again recursively
          if (data.length !== 0) {
            return fetchNewFolderName(callback)
          }

          callback(null, word1 + word2)
        })
      })
    }

    fetchNewFolderName(function (err, folderName) {
      if (err) {
        return next({
          status: 500,
          error: 'Error fetching folder name'
        })
      }

      res.send({ folder: folderName })

    })

  })
})

/* Download requested file by _id */
router.get('/files/:foldername/:id', function (req, res, next) {
  FilesModel.find({
    _id: req.params.id,
    folder: req.params.foldername
  }, {
    __v: 0
  }, function (err, data) {
    if (err) {
      console.log(err)
      return next(err)
    }
    if (!data.length) {
      return next({status: 404, error: 'Resource not found'})
    }

    var fileObj = data[0]

    s3.getSignedUrl('getObject', {
      Bucket: 'throwa.com',
      Key: fileObj.folder + '/' + fileObj.filename
    }, function (err, url) {
      if (err) return next(err)

      res.redirect(url)
    })

  })
})

/* GET files listing in a folder. */
router.get('/files/:foldername', function (req, res, next) {
  FilesModel.find({
    folder: req.params.foldername
  }, {
    __v: 0
  }, function (err, data) {
    if (err) return next(err)
    res.json(data)
  })
})

/* File upload handler */
router.post('/files/:foldername', function (req, res, next) {
  req.pipe(req.busboy)
  req.busboy.on('file', function (fieldname, stream, filename) {
    console.log('Uploading: ' + filename)

    var resFileData = null
    var fileSize = 0

    async.series([
      function (cb) {
        s3.upload({
          Bucket: 'throwa.com',
          Key: req.params.foldername + '/' + filename,
          ACL: 'private',
          Body: stream
        }, function (err, data) {
          if (err) {
            return cb(err)
          }
          console.log('s3 upload data', data)
          cb()
        })
      },
      function (cb) {
        s3.headObject({
          Bucket: 'throwa.com',
          Key: req.params.foldername + '/' + filename
        }, function (err, data) {
          if (err) {
            return cb(err)
          }
          console.log('s3 object head info', data)

          fileSize = data.ContentLength

          cb()
        })
      },
      function (cb) {
        FilesModel.create({
          filename: filename,
          folder: req.params.foldername,
          size: fileSize
        }, function (err, data) {
          if (err) {
            return cb(err)
          }
          // Save mongoDb results as success response data (Clone response object to allow deletion of useless parameter .__v)
          resFileData = JSON.parse(JSON.stringify(data))
          // Remove .__v from resFileData (Not needed)
          delete resFileData.__v

          console.log('Mongodb success data', data)
          cb()
        })
      }
    ], function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({status: 500, error: 'Error uploading file'})
      }

      res.status(201).send(resFileData)

    })

  })
})

/* Delete file handler */
router.delete('/files/:foldername/:id', function (req, res, next) {
  var fileObj = {}

  async.series([
    function (cb) {
      FilesModel.find({
        _id: req.params.id,
        folder: req.params.foldername
      }, {
        __v: 0
      }, function (err, data) {
        if (err) return cb(err)
        fileObj = data
        console.log(fileObj)
        cb()
      })
    },
    function (cb) {
      s3.deleteObject({
        Bucket: 'throwa.com',
        Key: req.params.foldername + '/' + fileObj.filename
      }, function (err, data) {
        console.log(err, data)
        if (err) return cb(err)
        cb()
      })
    },
    function (cb) {
      FilesModel.remove({
        _id: req.params.id,
        folder: req.params.foldername
      }, function (err, data) {
        console.log(err, data)
        if (err) return cb(err)
        cb()
      })
    }
  ], function (err) {
    if (err) {
      console.log(err)
      return res.status(403).send({status: 403, error: 'Error deleting file. The request is forbidden.'})
    }

    res.sendStatus(204)

  })
})

module.exports = router
