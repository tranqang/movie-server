const connection = require('../databases');
require('dotenv').config();
const jwt = require('jsonwebtoken');
exports.login = (req, res, next) => {
  const { email, password } = req.body;
  connection.query(
    'SELECT * FROM user WHERE email=? AND password=?',
    [email, password],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      const user = results[0];
      if (user?.id) {
        const token = jwt.sign(
          {
            userId: user.id,
            userRole: user.role,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: '1h' }
        );
        res.json({
          accessToken: token,
        });
        return;
      }

      next({ message: 'Đăng nhập thất bại' });
    }
  );
};
exports.register = (req, res, next) => {
  const { fullName, email, password, address, dob } = req.body;
  connection.query(
    'INSERT INTO user (fullName,email,password,address,dateOfBirth,role) VALUES(?,?,?,?,?,?)',
    [fullName, email, password, address, dob, 'USER'],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json({
        success: true,
        data: {
          message: 'Đăng ký thành công',
        },
      });
    }
  );
};
exports.getMyInformation = (req, res) => {
  const { userId } = req;
  console.log('userId', userId);
  connection.query(
    'SELECT user.id,user.fullName,user.role,user.email,user.address,user.gender,user.dateOfBirth,user.avatar FROM user WHERE id=?',
    [userId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
exports.getMyTickets = (req, res) => {
  const { userId } = req;
  console.log('userId', userId);
  connection.query(
    'SELECT ticket.id,ticket.value,ticket.created_date,ticket_detail.chair_id,chair.xPosition,cinema.name as cinema, chair.yPosition,schedule.premiere,room.name as room,movie.name as movie FROM ticket JOIN ticket_detail ON ticket_detail.ticket_id=ticket.id JOIN schedule ON schedule.id=ticket.schedule_id JOIN room ON room.id=schedule.room_id JOIN movie ON movie.id=schedule.movie_id JOIN chair ON chair.id=ticket_detail.chair_id JOIN cinema ON cinema.id=room.cinema_id WHERE user_id=?',
    [userId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
