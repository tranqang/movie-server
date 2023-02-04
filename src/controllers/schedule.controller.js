const connection = require('../databases');
const moment = require('moment');
exports.getSchedules = (req, res) => {
  const { cinemaId, day, movieId } = req.query;
  console.log('day', day);
  let query =
    'SELECT schedule.id,schedule.premiere,room.name as room,cinema.name as cinema,city.name as city,movie.name as movie FROM schedule JOIN room on schedule.room_id=room.id JOIN movie on schedule.movie_id=movie.id JOIN cinema on room.cinema_id=cinema.id JOIN city on cinema.city_id =city.id';
  if (cinemaId && day && movieId) {
    query =
      'SELECT schedule.*,room.name as room_name FROM schedule JOIN room ON room.id=schedule.room_id WHERE schedule.movie_id=? AND room.cinema_id=? AND DATE(schedule.premiere)=?';
  }
  connection.query(query, [movieId, cinemaId, day], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(results);
  });
};
exports.getScheduleById = (req, res) => {
  const { scheduleId } = req.params;
  connection.query(
    'SELECT * FROM schedule WHERE id=?',
    [scheduleId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
exports.getAllChairs = (req, res) => {
  console.log('get all chairs');
  connection.query('SELECT * FROM chair', (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(results);
  });
};
exports.getAmount = (req, res) => {
  const { date_type, time_type, format_id } = req.query;
  connection.query(
    'SELECT amount,amount_vip FROM amount WHERE dayOfWeek=? AND timeOfDay=? AND format_id =?',
    [date_type, time_type, format_id],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
exports.getReport = (req, res) => {
  const fromDate = req.query.fromDate || '2023-01-01';
  const toDate = req.query.toDate || '2024-01-01';
  const movieId = req.query.movieId;
  const query = movieId
    ? 'SELECT SUM(value) as value,created_date FROM ticket JOIN schedule ON schedule.id=ticket.schedule_id WHERE movie_id=? AND created_date BETWEEN ? AND ? GROUP BY created_date ORDER BY created_date'
    : 'SELECT SUM(value) as value,created_date FROM ticket WHERE created_date BETWEEN ? AND ? GROUP BY created_date ORDER BY created_date';
  const params = movieId ? [movieId, fromDate, toDate] : [fromDate, toDate];
  connection.query(query, params, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(results);
  });
};
exports.bookingChairs = (req, res) => {
  const { scheduleId, selectedChairs, totalMoney } = req.body;
  const { userId } = req;
  const today = moment().format('YYYY-MM-DD');
  connection.query(
    'INSERT INTO ticket(user_id,schedule_id,value,created_date) VALUES(?,?,?,?)',
    [userId, scheduleId, totalMoney, today],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      const ticketId = results.insertId;
      const newTicketDetail = selectedChairs.map(s => [ticketId, s]);
      connection.query(
        'INSERT INTO ticket_detail(ticket_id,chair_id) VALUES ?',
        [newTicketDetail],
        (err, results) => {
          if (err) {
            res.status(500).json({ message: err.message });
            return;
          }

          res.json({
            success: true,
            data: {
              message: 'Đặt vé thành công',
            },
          });
        }
      );
    }
  );
};
exports.getChairsByScheduleId = (req, res) => {
  const { scheduleId } = req.params;
  connection.query(
    'SELECT ticket_detail.* FROM ticket_detail JOIN ticket ON ticket.id=ticket_detail.ticket_id WHERE ticket.schedule_id=?',
    [scheduleId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
exports.getTimeTypeSchedule = (req, res) => {
  const { scheduleId } = req.params;
  connection.query(
    'SELECT schedule.*,movie.format_id, CASE WHEN EXISTS (SELECT 1 FROM holiday WHERE holiday.day = date(schedule.premiere)) THEN 3 WHEN DAYOFWEEK(schedule.premiere) BETWEEN 2 AND 6 THEN 1 ELSE 2 END AS date_type, IF(HOUR(schedule.premiere) < 18, 1, 2) AS time_type FROM schedule JOIN movie ON movie.id=schedule.movie_id where schedule.id=?',
    [scheduleId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
exports.createSchedule = (req, res) => {
  const { roomId, movieId, premiere } = req.body;
  connection.query(
    'INSERT INTO schedule(room_id,movie_id,premiere) VALUES (?,?,?)',
    [roomId, movieId, premiere],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json({
        success: true,
        data: {
          message: 'Thêm lịch chiếu thành công',
        },
      });
    }
  );
};
exports.updateSchedule = (req, res) => {
  const { id, roomId, movieId, premiere } = req.body;
  connection.query(
    'UPDATE schedule SET room_id=?,movie_id=?,premiere=? WHERE id=?',
    [roomId, movieId, premiere, id],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json({
        success: true,
        data: {
          message: 'Cập nhật lịch chiếu thành công',
        },
      });
    }
  );
};
exports.deleteSchedule = (req, res) => {
  connection.query(
    'DELETE FROM schedule WHERE id =?',
    [req.body.id],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json({
        success: true,
        data: {
          message: 'Xóa lịch chiếu thành công',
        },
      });
    }
  );
};
