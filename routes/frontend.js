var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('home', { templateName: 'home' })
})

router.get('/terms', function (req, res, next) {
  res.render('terms', { templateName: 'terms' })
})

router.get('/api', function (req, res, next) {
  res.render('api', { templateName: 'api' })
})

router.get('/contact', function (req, res, next) {
  res.render('contact', { templateName: 'contact' })
})

module.exports = router
