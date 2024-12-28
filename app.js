var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Inicializo la aplicacion Express.
var app = express();

//Importo los enrutadores que definen las rutas para el modulo de cursos (cursos).
var cursosRouter = require('./routes/cursos'); // Importa el enrutador de cursos


//Configuro el motor de vistas para utilizar hbs (Handlebars) y defino la carpeta views para las plantillas.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middlewares
//Configuro varios middlewares:
app.use(logger('dev')); //logger para registrar las solicitudes en modo "dev".

//express.json y express.urlencoded para procesar datos en JSON y formularios.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser()); //cookieParser para manejar cookies.
app.use(express.static(path.join(__dirname, 'public'))); //express.static para servir archivos estaticos desde la carpeta public.

// Configuración de rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', cursosRouter);

// Manejo los errores 404 redirigiendo cualquier ruta no encontrada a un error 404.

// Defino un manejador general de errores que muestra un mensaje de error. 
// Si estamos en desarrollo, se muestra la informacion completa; en produccion, solo un mensaje generico.
// Captura errores 404 y los pasa al manejador de errores

// Manejador de errores
app.use(function (err, req, res, next) {
  // Configura el estado HTTP y renderiza la vista de error
  res.status(err.status || 500);
  res.render('error', { error: err });
});

//Exporto la aplicacion configurada para que pueda usarse en otros modulos.
module.exports = app;
