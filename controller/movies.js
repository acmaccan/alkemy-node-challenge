// Importamos modelo
const { Movie, Character } = require('../models/models');

// Creamos película
const movieCreation = async(req, res) => {
    const { image, title, creation, rating/*, idCharacter*/ } = req.body;  // Requerimos datos a través del body

    Movie.create({
        image,
        title,
        creation,
        rating/*,
        characters: [
            { id: idCharacter }     // Asociación en desarrollo
        ]
    }, {
        include: Character*/
    }
    ).then(movie => {
        if(movie){
            res.status(201).send({
                movie,
                msg: 'Has creado una película'
            });
        } else {
            res.status(400).send('Ocurrió un problema durante la creación de la película');
        }
    });
}

// Buscamos película por ID
const movieById = async (req, res) => {
    let id = req.params.id;    // Requerimos id a través del body

    Movie.findOne({            // Buscamos película por id
        where: {
            id
        }
    }).then(movie => {
        if(movie){
            res.status(200).send(movie);
        } else {
            res.status(404).send('No encontramos la peícula que buscas');
        }
    });
}

// Editamos película
const movieEdit = async(req, res) => {
    const id = req.params.id;    // Requerimos el id a través del body
    const { image, title, creation, rating } = req.body; // Pedimos datos a actualizar a través del body

    Movie.findOne({             // Buscamos por id
        where: {
            id
        }
    }).then(movie => {          // Campos a actualizar
        if(movie){
            movie.update({
                image,
                title,
                creation,
                rating
            });
            res.status(200).send('La película ha sido actualizada');
        } else {
            res.status(400).send('No se ha podido actualizar la película');
        }
    });
}

// Borramos película
// En caso de querer evitar borrado de datos irrecuperables, 
// agregar una columna de estado para deshabilitar y habilitar
const movieDelete = async(req, res) => {
    const id = req.params.id;    // Requerimos id a través del body

    Movie.destroy({              // Buscamos por id
        where: {
            id
        }
    }).then(movie => {
        if(movie){
            res.status(200).send('La película ha sido eliminada');
        } else {
            res.status(400).send('No se pudo eliminar la película');
        }
    });
}

// Enlistamos películas - Con opción de búsqueda por título, género. Orden ascendente o descendente según título
const movieGet = async(req,res) => {
    if(!req.query.name && !req.query.genre && !req.query.order){
        Movie.findAll({
            attributes: ['title', 'image', 'creation']    // Mostramos sólo título, imagen y fecha de creación
        }).then(movie => { 
            if(movie){
                res.status(200).send(movie);
            } else {
                res.status(400).send('Ocurrió un problema durante la búsqueda de películas')
            }
        })
    }

    // Búsqueda por título
    if(req.query.name){
        Movie.findOne({
            where: {
                'title': req.query.name
            }
        }).then(movie => { 
            if(movie){
                res.status(200).send(movie);
            } else {
                res.status(400).send('No encontramos una película con ese título');
            }
        })
    }

    // Búsqueda por género
    if(req.query.genre){
        Movie.findAll({
            where: {
                genre: req.query.genre
            },
            attributes: ['title', 'image', 'creation']
        }).then(movie => { 
            if(movie.length === 0){ 
                res.status(400).send('No encontramos películas de ese género');
            } else {
                res.status(200).send(movie);
            }
        })
    }

    // Orden ascendente y descendente por título
    if(req.query.order){
        Movie.findAll({
            order: [[ 'title', req.query.order ]],
            attributes: ['title', 'image', 'creation']
        }).then(movie => { 
            if(movie){
                res.status(200).send(movie);
            } else {
                res.status(400).send('Sólo puede ordenarse de manera ascendente (ASC) o descendente (DESC)')
            }
        })
    }
}

module.exports = {
    movieCreation,
    movieGet,
    movieById,
    movieEdit,
    movieDelete,
}