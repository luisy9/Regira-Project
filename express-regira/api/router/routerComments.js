const express = require('express');
const router = express.Router();

const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'en-pinxo-li-va-dir-a-en-panxo'; // Clau secreta per a la generació de JWT
const { Proyecto, Usuario, Tarea, Comment } = require('../model'); // Importa els models de dades
const { readItems, readItem, updateItem, deleteItem } = require('../generics');

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
  '/comment',
  async (req, res, next) => await readItems(req, res, Comment)
);

router.get(
  '/comment/:id',
  async (req, res, next) => await readItem(req, res, Comment)
);
router.put(
  '/comment/:id',
  async (req, res, next) => await updateItem(req, res, Comment)
);
router.delete(
  '/comment/:id',
  async (req, res, next) => await deleteItem(req, res, Comment)
);

//Endpoint para mirar cuantos comentarios ha hecho un usuario
router.get('/comment/user/:id', async (req, res, next) => {
  try {
    const userComment = await Usuario.findAll(req.params.id); // Cerca l'usuari pel seu ID
    if (!userComment) {
      return res.status(500).json({ error: 'User no trobat' }); // Retorna error 500 si no es troba l'usuari
    }

    res.status(200).json(userComment);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//Endpoint para mirar cuantos comentarios hay en un proyecto de un usuario en concreto
router.get(
  '/comment/user/:idUser/proyecto/:idProyect',
  async (req, res, next) => {
    try {
      const userComment = await Comment.findAll({
        where: { usuarios_id: req.params.idUser },
        tareas_id: req.params.idProyect,
      }); // Cerca l'usuari pel seu ID
      // const UserProyecto = await Proyecto.findAll(req.params.id);

      if (!userComment) {
        return res.status(500).json({ error: 'User no trobat' }); // Retorna error 500 si no es troba l'usuari
      }

      res.status(200).json(userComment);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
);

//Endpoint para crear un comment
router.post('/comment', checkToken, async (req, res, next) => {
  try {
    if (!user || !task) {
      return res
        .status(500)
        .json({ error: 'El usuario o la tarea no encontrada' }); // Retorna error 500 si no es troba l'usuari
    }

    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//Endpoint para crear un comment en una tarea especifico con un usuario especifico tiene que ir con el checkToken
//En un proyecto en especifico
router.post('/comment/:tareaId/user/:idUser/project/:idProject', async (req, res, next) => {
  const { comment } = req.body;
  const { tareaId, idUser, idProject } = req.params;
  try {
    const commentTask = await Comment.create({
      title: comment,
      usuario_id: idUser,
      tareas_id: tareaId,
    });
    res.status(201).json(commentTask);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
