var express = require('express');
var router = express.Router();


router.get('/gestion-de-cursos/views/cursos/index.hbs', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
