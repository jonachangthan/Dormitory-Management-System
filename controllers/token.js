const db = require("../model/database");
const jwt = require("jsonwebtoken");

const token = (req, res, next) => {
  const token = req.cookies.JWT_token;

  if (!token) {
    return res.status(401).render('login', {
      message: '已登出!'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const dc = jwt.decode(token);

    db.query('SELECT * FROM account WHERE id = ?', [decoded.id], (error, results) => {
      if (error) {
        return res.status(401).render('login', {
          message: '查無此ID!'
        });
      }
      req.user = results[0];
      return next();
    });
  } catch (error) {
    // Token is expired or invalid
    return res.status(401).render('login', {
      message: 'Token已過期或無效!'
    });
  }
};

module.exports = token;
