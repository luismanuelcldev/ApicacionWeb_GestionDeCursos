// Importamos Express y creamos una instancia del Router
var express = require('express');
var router = express.Router();

// Ruta GET para la vista principal de cursos
router.get('/gestion-de-cursos/views/cursos/index.hbs', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Exportamos el router para usarlo en la aplicación principal
module.exports = router;
