const express = require('express');
const router = express.Router();

const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'en-pinxo-li-va-dir-a-en-panxo'; // Clau secreta per a la generació de JWT
const { Proyecto, Usuario, Tarea, Tag } = require('../model'); // Importa els models de dades
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

router.get('/tag', async (req, res, next) => await readItems(req, res, Tag)); //Mostrar todos los tags
router.get('/tag/:id', async (req, res, next) => await readItem(req, res, Tag)); //Mostrar un Tag en especifico
router.put(
  '/tag/:id',
  async (req, res, next) => await updateItem(req, res, Tag)
); //Hacer un update de un tag en especifico
router.delete(
  '/tag/:id',
  async (req, res, next) => await deleteItem(req, res, Tag)
); //Hacer un delete de un tag en especifico

//Endpoint para crear un tag
router.post('/tag', checkToken ,async (req, res, next) => {
  try {
    const { nombre } = req.body;

    const tagWithSameName = await Tag.findOne({ where: { nombre: nombre } });
    if (tagWithSameName) {
      return res
        .status(404)
        .json({ error: 'Existe un tag con el mismo nombre' });
    }

    const tag = await Tag.create({ nombre });
    res.status(201).json(tag);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//Endpoint para añadir una tarea con un tag en la tabla intermedia
router.post('/tag/tarea/:tareaId', async (req, res, next) => {
  try {
    const { tareaId } = req.params;
    const { tagsId } = req.body;

    if (!tagsId || !tareaId) {
      return res
        .status(404)
        .json({ error: 'tienes que poner el pkTag y la pkTarea' });
    }

    // const tag = await Tag.findByPk();
    const tarea = await Tarea.findByPk(tareaId);

    if (!tag || !tarea) {
      return res.status(404).json({ error: 'No ha encontrado o un tag o una tarea con los ids que le has pasado' });
    }

    await tarea.addTag(tag);
    res.status(201).json({ message: 'Se ha añadido!' });
  } catch (error) {
    res.status(500).json({ error: 'No funciona el endpoint' });
  }
});

//Endpoint para crear un tag con un usuario especifico
router.post('/tag/user/:id', checkToken, async (req, res, next) => {
  try {
    const { nombre } = req.body;
    const { id } = req.params.id;

    const user = await Usuario.findOne({ where: { id } }); // Cerca l'usuari pel seu ID
    if (!user) {
      return res.status(500).json({ error: 'User no trobat' }); // Retorna error 500 si no es troba l'usuari
    }

    const tag = await Tag.create({ nombre });
    res.status(201).json(tag);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//Enpoint para buscar las tareas con un tag especifico
router.get('/tag/:id/tareas', async (req, res, next) => {
  try {
    const { id } = req.params.id;

    const tagId = await Tag.findByPk(id);
    if (!tagId) {
      return res.status(500).json({ error: 'User no trobat' }); // Retorna error 500 si no es troba l'usuari
    }

    const tasks = await tagId.getTasks();

    res.json(tasks);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
