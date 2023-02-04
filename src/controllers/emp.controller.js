const connection = require('../databases');
exports.getEmps = (req, res) => {
  connection.query('SELECT * FROM user WHERE role="EMP"', (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(results);
  });
};
exports.createEmp = (req, res) => {
  const { fullName, email, password, address } = req.body;
  connection.query(
    'INSERT INTO user(fullName,address,email,password,role) VALUES(?,?,?,?,"EMP")',
    [fullName, address, email, password],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json({
        success: true,
        data:{
            message:'Thêm nhân viên thành công'
        }
      });
    }
  );
};
exports.getEmpById = (req, res) => {
  const { empId } = req.params;
  connection.query(
    'SELECT fullName,address,email,password from user WHERE id=?',
    [empId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json(results);
    }
  );
};
exports.updateEmp = (req, res) => {
  const { id, fullName, email, password, address } = req.body;
  connection.query(
    'UPDATE user SET fullName=?,address=?,email=?,password=? WHERE id=?',
    [fullName, address, email, password, id],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json({
        success: true,
        data:{
            message:'Cập nhật nhân viên thành công'
        }
      });
    }
  );
};
exports.deleteEmp = (req, res) => {
  connection.query(
    'DELETE FROM user WHERE id=?',
    [req.body.id],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.json({
        success: true,
        data:{
            message:'Xóa nhân viên thành công'
        }
      });
    }
  );
};
