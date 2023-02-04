const connection = require('../databases');
exports.getCinemas = (req, res) => {
  connection.query(
    'SELECT cinema.id,cinema.name,city.name as city FROM cinema JOIN city ON cinema.city_id=city.id',
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
exports.getCinemaById = (req, res) => {
  connection.query(
    'SELECT cinema.id,cinema.name,city.id as city_id,city.name as city FROM cinema JOIN city ON cinema.city_id=city.id where cinema.id=?',[req.params.cinemaId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
exports.createCinema = (req, res) => {
    const {name,cityId}=req.body
  connection.query(
    'INSERT INTO cinema(name,city_id) VALUES(?,?)',[name,cityId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json({
        success: true,
        data:{
            message:'Thêm rạp thành công'
        }
      });
    }
  );
};
exports.updateCinema = (req, res) => {
    const {id,name,cityId}=req.body
  connection.query(
    'UPDATE cinema SET name=?,city_id=? WHERE id=?',[name,cityId,id],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json({
        success: true,
        data:{
            message:'Cập nhật rạp thành công'
        }
      });
    }
  );
};
exports.deleteCinema = (req, res) => {
    const {id}=req.body
  connection.query(
    'DELETE FROM room  WHERE cinema_id=?',[id],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      connection.query(
        'DELETE FROM cinema  WHERE id=?',[id],
        (err, results) => {
          if (err) {
            res.status(500).json({ message: err.message });
            return;
          }
          res.json({
            success: true,
            data:{
                message:'Xóa rạp thành công'
            }
          });
        }
      );
    }
  );
};
exports.getCities = (req, res) => {
  connection.query(
    'SELECT * FROM city',
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
exports.getRoomsByCinemaId = (req, res) => {
    const {cinemaId}=req.params
    console.log('cinemaId',cinemaId);
  connection.query(
    'SELECT * FROM room WHERE cinema_id=?',[cinemaId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
exports.getCinemaByCityId = (req, res) => {
    const {cityId}=req.params
  connection.query(
    'SELECT * FROM cinema WHERE city_id=?',[cityId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
exports.getCinemaByRoomId = (req, res) => {
    const {roomId}=req.params
  connection.query(
    'SELECT * FROM room WHERE id=?',[roomId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
exports.addRoom = (req, res) => {
    const {roomName,cinemaId}=req.body
  connection.query(
    'INSERT INTO room(name,cinema_id) VALUES(?,?)',[roomName,cinemaId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json({
        success: true,
        data:{
            message:'Thêm phòng thành công'
        }
      });
    }
  );
};