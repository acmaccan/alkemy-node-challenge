// Importamos librerías
const { Sequelize } = require('sequelize');

// Inicializamos nuestra conexión a nuestra DB con Sequelize
// Datos de conexión en .env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,{
    host: process.env.DB_HOST,
    port: process.env.PORT,
    dialect: 'mysql'
});

// Exportamos módulo
module.exports = sequelize;