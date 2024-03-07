const express = require('express');
const router = express.Router();

const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'en-pinxo-li-va-dir-a-en-panxo'; // Clau secreta per a la generació de JWT
const { Proyecto, Usuario, Tarea } = require('../model'); // Importa els models de dades
const { readItems, readItem, deleteItem, updateItem } = require('../generics');

//AUTHENTICATION
//AUTHENTICATION
//AUTHENTICATION
//AUTHENTICATION

const checkToken = (req, res, next) => {
  const token = req.cookies?.token; // Obté el token des de la cookie de la petició
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' }); // Retorna error 401 si no hi ha cap token
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY); // Verifica el token utilitzant la clau secreta
    req.userId = decodedToken.userId; // Estableix l'ID d'usuari a l'objecte de la petició
    next(); // Passa al següent middleware
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' }); // Retorna error 401 si el token és invàlid
  }
};

//CRUD
//CRUD
//CRUD
//CRUD
//CRUD
//CRUD

router.get(
  '/tarea',
  async (req, res, next) => await readItems(req, res, Tarea)
);

router.get(
  '/tarea/:id',
  async (req, res, next) => await readItem(req, res, Tarea)
);

router.put(
  '/tarea/:id',
  async (req, res, next) => await updateItem(req, res, Tarea)
);

router.delete(
  '/tarea/:id',
  async (req, res, next) => await deleteItem(req, res, Tarea)
);

//Todas las tareas de un usuario especifico
router.get('/tarea/users/:id', async (req, res, next) => {
  const usuarioTareas = await Tarea.findAll({
    where: { usuarios_id: req.params.id },
  });

  if (!usuarioTareas) {
    return res
      .status(404)
      .json({ error: 'El usuario no tiene asignadas tareas' });
  }
  res.status(200).json(usuarioTareas);
});

//Todas las tareas de el author en concreto
router.get('/tarea/author/:id', async (req, res, next) => {
  const authorId = await Tarea.findAll({
    where: { author_id: req.params.id },
  });

  if (!authorId) {
    return res.status(404).json({ error: 'El author no tiene tareas creadas' });
  }

  res.status(201).json(authorId);
});

//Todas las tareas de un proyecto en especifico
router.get('/tarea/proyecto/:id', async (req, res, next) => {
  const TareasProyecto = await Tarea.findAll({
    where: { proyectos_id: req.params.id },
  });

  if (!TareasProyecto) {
    return res
      .status(404)
      .json({ error: 'El proyecto no tiene ninguna tarea' });
  }

  res.status(201).json(TareasProyecto);
});

//Endpoint para crear una nueva tarea
router.post('/tarea', async (req, res, next) => {
  try {
    const { usuarios_id } = req.body;
    const user = await Usuario.findByPk(usuarios_id); // Cerca l'usuari pel seu ID
    if (!user) {
      return res.status(500).json({ error: 'User no trobat' }); // Retorna error 500 si no es troba l'usuari
    }

    req.body.usuarios_id = usuarios_id; // Estableix l'ID de l'usuari en el cos de la petició

    const tarea = await Tarea.create(req.body);

    res.status(201).json(tarea);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
