// Importamos Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Creamos los modelos que vamos a utilizar
class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    pass: DataTypes.STRING
}, {
    sequelize,
    modelName: 'users',
    timestamps: false
});

class Character extends Model {}
Character.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: {
                args: true,
                msg: 'Ingrese una edad válida'
            }
        }
    },
    weight: {
        type: DataTypes.INTEGER
    },
    story: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'characters',
    timestamps: false
});

class Movie extends Model {}
Movie.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    title: {
        type: DataTypes.STRING
    },
    creation: {
        type: DataTypes.INTEGER,    // En caso de DATEONLY, el formato es YYYY-MM-DD
        validate: {
            isNumeric: {
                args: true ,
                msg: 'Ingresar sólo año'
            },
            len: {
                args: [4],
                msg: 'Ingresar sólo año'
            }
        }    
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    }
}, {
    sequelize,
    modelName: 'movies',
    timestamps: false
});

class Genre extends Model {}
Genre.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'genres',
    timestamps: false
});

// Exportamos nuestros modelos
module.exports = {
    User,
    Character,
    Movie,
    Genre
}