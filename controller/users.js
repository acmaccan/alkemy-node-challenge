// Importamos modelo, librería para la encriptación de password y librería para el token
const { User } = require('../models/models');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.BCRYPT_KEY);
const jwt = require('jsonwebtoken');

// Registro de usuario
const userRegistration = async(req, res) => {
    const {mail, pass} = req.body;      // Requerimos mail y pass a través del body

    User.create({
        mail,
        pass: cryptr.encrypt(pass)      // Encriptamos pass
    }).then(user => {
        res.status(201).send({user, msg: 'Tu cuenta ha sido creada'});
    }).catch(err => {
        res.status(400).send('Ha ocurrido un problema durante tu registro - ' + err);
    });
};

// Login de usuario
const userLogin = async(req, res) => {
    const {mail, pass} = req.body;      // Requerimos mail y pass a través del body
    
    User.findOne({                      // Encontrar que coincida por mail
        where: {
            mail
        }
    }).then(user => {
        if(!user) {                     // Si el mail no existe
            res.status(401).send('Ingresa un correo y/o contraseña válida - Error user');
        } else {                        // Si existe, desencriptamos pass y comparamos
            let password = cryptr.decrypt(user.pass);
            
            if(password != pass) {      // Si pass no coincide
                res.status(401).send('Ingresa un correo y/o contraseña válida - Error contraseña');
            } else {                    // Si pass coincide
                // 1° param info a encriptar - No pasar usuarios o contraseñas, en 2° la llave
                let token = jwt.sign({id:user.id}, process.env.JWT_KEY);    // Generamos token
                res.status(200).send({user, token}); 
            };
        };
    });
};

// Lista de usuarios
const userGetAll = async(req, res) => {
    User.findAll()
    .then(users => {
        if(users){
            res.status(200).send(users);
        } else {
            res.status(404).send('No se han encontrado usuarios');
        };
    });
};

// Borramos usuario 
// En caso de querer evitar borrado de datos irrecuperables, agregar una columna de estado para deshabilitar y habilitar
const userDelete = async(req, res) => {
    const id = req.params.id;           // Requerimos el id a través del body

    User.destroy({                      // Borramos usuario según id
        where: {
            id
        }
    }).then(user => {                   // Si se encuentra el usuario
        if(user){
            res.status(200).send('El usuario se ha eliminado');
        } else {                        // Si no se encuentra el usuario
            res.status(400).send('No se ha podido borrar el usuario');
        };
    });
};

module.exports = {
    userRegistration,
    userLogin,
    userGetAll,
    userDelete
}