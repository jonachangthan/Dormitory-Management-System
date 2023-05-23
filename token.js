const db = require("./model/database")
const jwt = require("jsonwebtoken");

const token = (req, res, next) => {
    //* 在app.js使用app.use(cookieParser())來抓取
    const token = req.cookies.JWT_token;

    //* 若未抓到token
    if (!token) {
        return res.status(401).render('login', {
            message: '已登出!'
        });
    }

    //* cookie解碼
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //* 判斷是否有此ID
    db.query('SELECT * FROM account WHERE id = ?', [decoded.id], (error, results) => {
        if (error) {
            return res.status(401).render('login', {
                message: '查無此ID!'
            });
        }
        req.user = results[0];
        return next();
    });
}

module.exports = token;