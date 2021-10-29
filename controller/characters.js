// Importamos modelo y operador de sequelize para las queries
const { Character, Movie } = require('../models/models');
const { Op } = require("sequelize");

// Creamos personaje
const characterCreation = async(req, res) => {
    const { image, name, age, weight, story/*, idMovie*/ } = req.body;    // Requerimos datos a través del body

    Character.create({
        image, 
        name, 
        age, 
        weight, 
        story/*,
        movies: [ 
            { id: idMovie }         // Asociación en desarrollo
        ]
    }, {
        include: Movie*/
    }
    ).then(character => {
        res.status(201).send(character);
    }).catch(err => {
        res.status(404).send('Ocurrió un problema durante la creación del personaje - ' + err);
    });
}

// Enlistamos personajes - Con opción de búsqueda por nombre, edad, peso o películas
const characterGet = async(req, res) => {
    if(!req.query.name && !req.query.age && !req.query.weight /*&& !req.query.movies*/){    // Si no pasan queries
        Character.findAll({
            attributes: ['name','image']    // Retornamos nombre e imagen solamente
        })
        .then(character => {
            res.status(200).send(character);
        }).catch(err => {
            res.status(400).send('No encontramos los personajes - ' + err);
        }) 
    } else {                                // Si hay queries
        Character.findAll({                 // Utilizará las queries para la búsqueda de coincidencias en la DB
            where: {
                [Op.or]: {                  // Requeriremos por queries el nombre, edad, peso o películas
                    name:       { [Op.like]: '%' + req.query.name   + '%' },
                    age:        { [Op.like]: '%' + req.query.age    + '%' },
                    weight:     { [Op.like]: '%' + req.query.weight + '%' }/*,
                    movies:     { [Op.like]: '%' + req.query.movies + '%' }*/
                },
            },
            /*include: 'movies',*/          // Asociación en desarollo
            attributes: ['name','image']    // Solicitamos el retorno del nombre e imagen solamente
        })
        .then(character => {
            if(character.length === 0){
                res.status(400).send('No encontramos el personaje que buscas')
            } else {
                res.status(200).send(character)
            }
        }).catch(err => {
            res.status(400).send('No encontramos el personaje que buscas - ' + err);
        }) 
    }
}

// Buscamos por id y devolvemos todos los datos, a excepción del id
const characterById = async(req, res) => {
    const id = req.params.id;    // Requerimos id a través del body
    
    Character.findOne({         // Busca personaje por id
        where: {
            id
        },
        attributes: ['image', 'name', 'age', 'weight', 'story'/*, 'movies'*/]
    }).then(character => {
            res.status(200).send(character);
    }).catch(err => {
            res.status(400).send('No encontramos ese personaje - ' + err);
    });
}

// Editamos personaje
const characterEdit = async(req, res) => {
    const id = req.params.id;    // Requerimos id a través del body
    const { image, name, age, weight, story, movies } = req.body;    // Pedimos datos a actualizar a través del body

    Character.findOne({         // Busca personaje según id
        where: {
            id
        }
    }).then(character => {
        character.update({  // Campos a actualizar
            image,
            name,
            age,
            weight,
            story,
            movies
        });
        res.status(201).send('El personaje se ha actualizado');
    }).catch(err => {
        res.status(400).send('No se pudo actualizar el personaje - ' + err);
    });
}

// Borramos personaje
const characterDelete = async(req, res) => {
    const id = req.params.id;    // Requerimos id a través del body

    Character.destroy({         // Borra personaje según id
        where: {
            id
        }
    })
    .then(res.status(200).send('El personaje ha sido eliminado'))
    .catch(err => {
        res.status(400).send('No se ha podido actualizar el personaje - ' + err);
    });
}

module.exports = {
    characterCreation,
    characterGet,
    characterById,
    characterEdit,
    characterDelete,
}