// Importamos modelos
const { Character, Movie, Genre } = require('../models/models');

// Relación Many-to-many
// Películas tiene muchos personajes - Personajes tiene muchas películas
const CharacterMovies = sequelize.define('charactermovies', {
    idMovie: {
      type: DataTypes.INTEGER,
      references: {
        model: Movie, // 'Movies' would also work
        key: 'id'
      }
    },
    idCharacter: {
      type: DataTypes.INTEGER,
      references: {
        model: Character, // 'Characters' would also work
        key: 'id'
      }
    }
  });

// Genera una nueva tabla 
Movie.belongsToMany(Character, { through: CharacterMovies });
Character.belongsToMany(Movie, { through: CharacterMovies });

// Relación One-to-many
// Género tiene muchas películas - Películas tiene un género
// A desarrollar
Genre.hasMany(Movie);
Movie.belongsTo(Genre);

module.exports = {
    CharacterMovies
}