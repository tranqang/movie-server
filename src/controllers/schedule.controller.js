const connection = require('../databases');
const moment = require('moment');
const Schedule = require('../models/schedule.model');
exports.getSchedules = async (req, res) => {
  const { cinemaId, day, movieId } = req.query;
  try {
    const results = await Schedule.getSchedule(cinemaId, day, movieId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getScheduleById = async (req, res) => {
  const { scheduleId } = req.params;
  try {
    const results = await Schedule.getScheduleById(scheduleId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllChairs = async (req, res) => {
  try {
    const results = await Schedule.getAllChairs();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAmount = async (req, res) => {
  const { date_type, time_type, format_id } = req.query;
  try {
    const results = await Schedule.getAmount(date_type, time_type, format_id);
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getReport = async (req, res) => {
  const fromDate = req.query.fromDate || '2023-01-01';
  const toDate = req.query.toDate || '2024-01-01';
  const movieId = req.query.movieId;
  try {
    const results = await Schedule.getReport(movieId, fromDate, toDate);
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.bookingChairs = async (req, res) => {
  const { scheduleId, selectedChairs, totalMoney } = req.body;
  const { userId } = req;
  const today = moment().format('YYYY-MM-DD');
  try {
    const results = await Schedule.bookingChairs(
      userId,
      scheduleId,
      totalMoney,
      today,
      selectedChairs
    );
    return res.json({
      success: true,
      data: {
        message: 'Đặt vé thành công',
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getTicketByCode = async (req, res) => {
  const { code } = req.query;
  try {
    const results = await Schedule.getTicketByCode(code);
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.receiveTicket = async (req, res) => {
  const { code } = req.body;
  try {
    const results = await Schedule.receiveTicket(code);
    return res.json({
      success: true,
      data: {
        message: 'Nhận vé thành công',
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getChairsByScheduleId = async (req, res) => {
  const { scheduleId } = req.params;
  try {
    const results = await Schedule.getChairsByScheduleId(scheduleId);
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getTimeTypeSchedule = async (req, res) => {
  const { scheduleId } = req.params;
  try {
    const results = await Schedule.getTimeTypeSchedule(scheduleId);
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createSchedule = async (req, res) => {
  const { roomId, movieId, premiere } = req.body;
  try {
    const results = await Schedule.createSchedule(roomId, movieId, premiere);
    return res.json({
      success: true,
      data: {
        message: 'Thêm lịch chiếu thành công',
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateSchedule = async (req, res) => {
  const { id, roomId, movieId, premiere } = req.body;

  try {
    const results = await Schedule.updateSchedule(
      roomId,
      movieId,
      premiere,
      id
    );
    return res.json({
      success: true,
      data: {
        message: 'Cập nhật lịch chiếu thành công',
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  const { id } = req.body;
  try {
    const results = await Schedule.deleteSchedule(id);
    return res.json({
      success: true,
      data: {
        message: 'Xóa lịch chiếu thành công',
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
