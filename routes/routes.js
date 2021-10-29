// Importamos librerías
const express = require('express');
const router = express.Router();
const jwtAuth = require('../middlewares/jwtAuth');
const { userRegistration, userLogin, userGetAll, userDelete } = require('../controller/users');
const { characterCreation, characterById, characterEdit, characterDelete, characterGet } = require('../controller/characters');
const { movieCreation, movieGet, movieById, movieEdit, movieDelete } = require('../controller/movies');

// ↓ Routes para nuestros endpoints - Ver lógica acceso a datos en controllers ↑

// Users
router.post('/auth/register', userRegistration);
router.post('/auth/login', userLogin);
router.get('/users', jwtAuth, userGetAll);
router.delete('/users/:id', jwtAuth, userDelete);

// Characters
router.post('/characters', jwtAuth, characterCreation);
router.get('/characters', jwtAuth, characterGet);
router.get('/characters/:id', jwtAuth, characterById);
router.put('/characters/:id', jwtAuth, characterEdit);
router.delete('/characters/:id', jwtAuth, characterDelete);

// Movies
router.post('/movies', jwtAuth, movieCreation);
router.get('/movies', jwtAuth, movieGet);
router.get('/movies/:id', jwtAuth, movieById);
router.put('/movies/:id', jwtAuth, movieEdit);
router.delete('/movies/:id', jwtAuth, movieDelete);  

// Exportamos nuestro módulo
module.exports = router;