const mysql = require('mysql');
const dotenv = require('dotenv');

//* 保存敏感資訊(密碼)之環境
dotenv.config({ path: './.env' });

//* 與MySQL建立連結
var db = mysql.createConnection({
    host: process.env.DMS_DATABASE_HOST,
    user: process.env.DMS_DATABASE_USER,
    password: process.env.DMS_DATABASE_PASSWORD,
    database: process.env.DMS_DATABASE
});

//* 判斷連線情形
db.connect((error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log('MySQL已連接...')
    }
});

module.exports = db;