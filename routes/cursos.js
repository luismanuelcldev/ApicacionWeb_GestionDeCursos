// Primero, importo los modulos necesarios.

const express = require('express'); // express para manejar las rutas
const fs = require('fs'); // fs para manipular el sistema de archivos
const path = require('path'); // path para trabajar con rutas de archivos
const router = express.Router(); // creo un enrutador de Express.
const filePath = path.join(__dirname, '../data/cursos.json'); //Defino la ruta del archivo JSON donde se almacenan los datos de los cursos.

// Creo dos funciones auxiliares para trabajar con el archivo JSON:
// readCursos lee y convierte el contenido del archivo en un objeto JavaScript.
function readCursos() {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// writeCursos escribe los datos en el archivo después de convertirlos a JSON.
function writeCursos(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Ruta #1 - Mostrar todos los cursos
router.get('/cursos', (req, res) => { // Uso readCursos para obtener los datos y renderizo la vista cursos/index con la lista de cursos.
  const cursos = readCursos();
  res.render('cursos/index', { cursos });
});

// Ruta #2 - Mostrar un curso especifico
router.get('/cursos/:codigoCurso', (req, res) => {
  const { codigoCurso } = req.params;
  const curso = readCursos().find(curso => curso.codigo === codigoCurso);
  if (!curso) return next(createError(404));
  res.render('cursos/detalle', { curso });
});

// Ruta #3 - Agregar un curso
router.post('/cursos', (req, res) => {
  const cursos = readCursos();
  const nuevoCurso = {
    codigo: `DAM${Math.floor(Math.random() * 900 + 100)}`,
    nombre: "Curso nuevo - prueba",
    creditos: 3,
    semestre: 1,
    descripcion: "Curso de prueba, practica 4"
  };
  cursos.push(nuevoCurso);
  writeCursos(cursos);
  res.send('Curso creado exitosamente');
});

// Ruta #4 - Actualizar descripción de un curso
router.put('/cursos/:codigoCurso/:descripcion', (req, res) => {
  const { codigoCurso, descripcion } = req.params;
  const cursos = readCursos();
  const curso = cursos.find(curso => curso.codigo === codigoCurso);
  if (!curso) return next(createError(404));

  curso.descripcion = descripcion;
  writeCursos(cursos);
  res.redirect(`/cursos/${codigoCurso}`);
});

// Ruta #5 - Eliminar un curso
router.delete('/cursos/:codigoCurso', (req, res) => {
  const { codigoCurso } = req.params;
  let cursos = readCursos();
  const cursoIndex = cursos.findIndex(curso => curso.codigo === codigoCurso);

  if (cursoIndex === -1) return res.status(404).send('Curso no encontrado');

  cursos.splice(cursoIndex, 1);
  writeCursos(cursos);
  res.send('Curso eliminado exitosamente');
});

// Finalmente, exporto el enrutador para que pueda ser utilizado en la aplicacion principal.
module.exports = router;
