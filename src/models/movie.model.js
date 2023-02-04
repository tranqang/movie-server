const connection = require('../databases');
exports.getMovies = callback => {
  connection.query(
    'SELECT m.id,m.name,m.description,m.director,m.image,m.view,m.ageLimit,m.timeRelease,m.time,l.name as language, f.name as format FROM movie m JOIN language l on m.language_id=l.id JOIN format f on f.id=m.format_id',
    (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    }
  );
};
exports.getCategoriesByMovieId = (data, callback) => {
  connection.query(
    'SELECT c.id,c.name FROM movie_category m  JOIN category c on c.id=m.category_id  WHERE movie_id=?',
    [data],
    (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    }
  );
};
