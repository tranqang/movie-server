const model = require('../models/movie.model');
const connection = require('../databases');
exports.getMovies = (req, res, next) => {
  model.getMovies((err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(results);
  });
};
exports.getCategoriesByMovieId = (req, res) => {
  model.getCategoriesByMovieId(req.params.movieId, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(results);
  });
};
exports.getMovieById = (req, res) => {
  connection.query(
    'SELECT movie.*,language.name as language,format.name as format,country.name as country FROM movie JOIN language ON movie.language_id=language.id JOIN format on format.id=movie.format_id JOIN country ON country.id=movie.country_id WHERE movie.id=?',
    // 'SELECT m.id,m.name,m.description,m.director,m.image,m.view,m.ageLimit,m.timeRelease,m.time,l.name as language f.name as format, f.id as format_id, l.id as language_id ,c.name as country FROM movie m  JOIN language l on m.language_id=l.id  JOIN format f on f.id=m.format_id  JOIN country c on c.id=m.country_id WHERE m.id=?'
    [req.params.movieId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
exports.getCategories = (req, res) => {
  connection.query('SELECT * FROM category', (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(results);
  });
};
exports.getLanguages = (req, res) => {
  connection.query('SELECT * FROM language', (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(results);
  });
};
exports.getFormats = (req, res) => {
  connection.query('SELECT * FROM format', (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(results);
  });
};
exports.getCountries = (req, res) => {
  connection.query('SELECT * FROM country', (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(results);
  });
};
exports.createMovie = (req, res) => {
  const {
    name,
    director,
    description,
    image,
    countryId,
    languageId,
    view,
    ageLimit,
    timeRelease,
    time,
    formatId,
    categoryId,
  } = req.body;
  connection.query(
    'INSERT INTO movie(name,director,description,image,country_id,language_id,view,ageLimit,timeRelease,time,format_id) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
    [
      name,
      director,
      description,
      image,
      countryId,
      languageId,
      view,
      ageLimit,
      timeRelease,
      time,
      formatId,
    ],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }

      connection.query(
        'INSERT INTO movie_category(movie_id,category_id) VALUES(?,?)',
        [results.insertId, categoryId],
        (err, results) => {
          if (err) {
            res.status(500).json({ message: err.message });
            return;
          }

          res.json({
            success: true,
            data: {
              message: 'Thêm mới phim thành công',
            },
          });
        }
      );
    }
  );
};
exports.updateMovie = (req, res) => {
  const {
    id,
    name,
    director,
    description,
    image,
    countryId,
    languageId,
    view,
    ageLimit,
    timeRelease,
    time,
    formatId,
    categoryId,
  } = req.body;
  console.log('req.body', req.body);
  connection.query(
    'UPDATE movie SET name=?,director=?,description=?,image=?,country_id=?,language_id=?,view=?,ageLimit=?,timeRelease=?,time=?,format_id=? WHERE id=?',
    [
      name,
      director,
      description,
      image,
      countryId,
      languageId,
      view,
      ageLimit,
      timeRelease,
      time,
      formatId,
      id,
    ],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }

      connection.query(
        'UPDATE movie_category SET category_id=? WHERE movie_id=?',
        [categoryId, id],
        (err, results) => {
          if (err) {
            res.status(500).json({ message: err.message });
            return;
          }

          res.json({
            success: true,
            data: {
              message: 'Cập nhật phim thành công',
            },
          });
        }
      );
    }
  );
};

exports.deleteMovie = (req, res) => {
  const { id } = req.body;
  console.log('req.body', req.body);
  connection.query(
    'DELETE FROM movie_category WHERE movie_id=?',
    [id],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }

      connection.query('DELETE FROM movie WHERE id=?', [id], (err, results) => {
        if (err) {
          res.status(500).json({ message: err.message });
          return;
        }

        res.json({
          success: true,
          data: {
            message: 'Xóa phim thành công',
          },
        });
      });
    }
  );
};
