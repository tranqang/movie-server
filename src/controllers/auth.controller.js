const connection = require('../databases');
const moment = require('moment');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/auth.model');
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const results = await User.findByEmailAndPassword(email, password);
    const user = results[0];
    if (user?.id) {
      const token = jwt.sign(
        {
          userId: user.id,
          userRole: user.role,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '2h' }
      );
      res.json({
        accessToken: token,
      });
      return;
    }
    next({ message: 'Đăng nhập thất bại' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.register = async (req, res, next) => {
  const { fullName, email, password, address, dob } = req.body;
  try {
    const userResult = await User.findByEmail(email);
    if (userResult.length > 0) {
      res.json({
        success: false,
        data: {
          message: 'Email đã được sử dụng',
        },
      });
    }
    const results = await User.create(fullName, email, password, address, dob);
    res.json({
      success: true,
      data: {
        message: 'Đăng ký thành công',
        results: results,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyInformation = async (req, res) => {
  const { userId } = req;
  try {
    const results = await User.getMyInformation(userId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateMyInformation = async (req, res) => {
  const { fullName, dateOfBirth, address, avatar } = req.body;
  const formatDate = moment(dateOfBirth).format('YYYY-MM-DD');
  const { userId } = req;
  try {
    const results = await User.updateMyInformation(
      fullName,
      formatDate,
      address,
      avatar,
      userId
    );
    res.json({
      success: true,
      data: {
        message: 'Sửa thông tin thành công',
        results: results,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyTickets = async (req, res) => {
  const { userId } = req;
  try {
    const result = await User.getMyTickets(userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
