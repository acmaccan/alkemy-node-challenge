// Importamos JWT
const jwt = require('jsonwebtoken');

// Exportamos módulo token
module.exports = async(req, res, next) => {
    let token = req.headers['token'];                                   // Obtener el token por header

    if(!token){
        res.status(401).send('No tienes acceso a esta información');    // Si el cliente no trae el token, no se permite acceso
    } else {
        jwt.verify(token, process.env.JWT_KEY, (err) => {
            if(err){                    
                res.status(401).send('El token no es válido');          // Si el token no es válido o está expirado
            } else {
                next();                                                 // Se permite el acceso
            };
        });
    };
};