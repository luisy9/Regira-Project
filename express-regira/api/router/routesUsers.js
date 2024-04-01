const express = require('express');
const router = express.Router();

const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'en-pinxo-li-va-dir-a-en-panxo'; // Clau secreta per a la generació de JWT
const { Usuario } = require('../model'); // Importa els models de dades
const { readItems, readItem, updateItem, deleteItem } = require('../generics');

//MIDLEWARE
//MIDLEWARE
//MIDLEWARE
//MIDLEWARE
//MIDLEWARE

// Middleware per verificar el JWT en la cookie
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
  '/users',
  checkToken,
  async (req, res, next) => await readItems(req, res, Usuario)
);

router.get(
  '/users/:id',
  checkToken,
  async (req, res, next) => await readItem(req, res, Usuario)
);
router.put(
  '/users/:id',
  async (req, res, next) => await updateItem(req, res, Usuario)
);
router.delete(
  '/users/:id',
  async (req, res, next) => await deleteItem(req, res, Usuario)
);

//End poit para hacer el login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    //Encontrar que hay un usuario con ese email
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'This User is not registered' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // Compara la contrasenya proporcionada amb la contrasenya encriptada de l'usuari

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Password incorrect' });
    }

    //Si la contraseña existe generamos el token de autenticacion con nuestra SECRET_KEY
    const token = jwt.sign(
      { userId: user.id, userName: user.nombre }, // El JWT se hara con el id del usuario y el nombre del usuario
      SECRET_KEY, // SECRET_KEY para que haga el encriptacion a partir de esa clave
      { expiresIn: '2h' } // Genera un token JWT vàlid durant 2 hores
    );

    res.cookie('token', token, { httpOnly: false, maxAge: 7200000 }); // Estableix el token com una cookie

    // const yourUser

    res.json({ message: 'Login success', id: user.id }); // Retorna missatge d'èxit
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//Enpoint para que se registre el usuario
router.post('/register', async (req, res) => {
  const { email, nombre, password } = req.body;

  try {
    if (!email || !nombre || !password) {
      return res
        .status(400)
        .json({ error: 'Name, email and password are required' });
    }

    const existingUser = await Usuario.findOne({ where: { email } }); // Comprova si l'email ja està registrat
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya existe' }); // Retorna error 400 si l'email ja està registrat
    }

    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
