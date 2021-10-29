// Importamos librerías
const express = require('express');
const http = require('http');
require('dotenv').config();

// Inicializamos el servidor
const app = express();
const server = http.Server(app);
const port = process.env.APP_PORT;

// Definimos nuestro entry point
app.get('/', function (req, res) {
   res.send('Bienvenido a Mundo Disney!');
});
 
// Importamos las rutas con los endpoints requeridos para el proyecto
const route = require('./routes/routes');

// Inicializamos nuestras rutas
app.use(express.json()); // Nos permite pasar el body en un POST
app.use('/', route);

// Ejecutamos nuestro servidor
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`); // Sólo para desarrollo
});
