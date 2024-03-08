const express = require('express');
const router = express.Router();

const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'en-pinxo-li-va-dir-a-en-panxo'; // Clau secreta per a la generació de JWT
const { Proyecto, Usuario } = require('../model'); // Importa els models de dades
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
  '/proyecto',
  async (req, res, next) => await readItems(req, res, Proyecto)
);

router.get(
  '/proyecto/:id',
  async (req, res, next) => await readItem(req, res, Proyecto)
);
router.put(
  '/proyecto/:id',
  async (req, res, next) => await updateItem(req, res, Proyecto)
);
router.delete(
  '/proyecto/:id',
  async (req, res, next) => await deleteItem(req, res, Proyecto)
);

//Endpoint para crear un proyecto
router.post('/proyecto', checkToken, async (req, res, next) => {
  try {
    const { nombre, descripcion, active, usuarios_id } = req.body.data;

    const user = await Usuario.findByPk(usuarios_id); // Cerca l'usuari pel seu ID
    if (!user) {
      return res.status(500).json({ error: 'User no trobat' }); // Retorna error 500 si no es troba l'usuari
    }

    req.body.usuarios_id = req.usuarios_id; // Estableix l'ID de l'usuari en el cos de la petició
    const nameProyecto = await Proyecto.findOne({ where: { nombre } });
    if (nameProyecto) {
      return res
        .status(404)
        .json({ error: 'Ya hay un proyecto con el mismo nombre' });
    }

    const proyecto = await Proyecto.create({
      ...req.body.data,
      usuarios_id,
    });

    res.json(proyecto);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
