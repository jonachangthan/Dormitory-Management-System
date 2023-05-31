//* 以 express 作為後臺
const express = require('express');
const cookieParser = require("cookie-parser");
const path = require('path')
const app = express();
const port = process.env.PORT || 5500; // server port

//* 放置任何前端文件之地方
const publicDirectory = path.join(__dirname, './public') // __dirname: 用以訪問當前目錄之nodejs變數

//* 取得任何靜態文件
app.use(express.static(publicDirectory));

//* 解析由HTML表單發送之URL編碼內容，確保可以從任何表單中獲取數據
app.use(express.urlencoded({ extended: false }));

//* 解析Cookie
app.use(cookieParser());

//* 將從表單獲取之數據以json形式傳送
app.use(express.json());

//* 設定View Engine來顯示hbs
app.set('view engine', 'hbs');

//* 定義訪問所有頁面之路由
app.use('/', require('./routes/pages'));

//* 提交表單驗證時，訪問auth路由
app.use('/auth', require('./routes/auth'));

app.use('/bulletin', require('./routes/bulletin'));

app.use('/manager', require('./routes/manager'));

app.use('/managerToStudent', require('./routes/managerToStudent'));

app.use('/managerToViolation', require('./routes/managerToViolation'));

app.use('/managerToApply', require('./routes/managerToApply'));

app.use('/managerToEquipment', require('./routes/managerToEquipment'));

app.use('/message', require('./routes/message'));

app.use('/student', require('./routes/student'));

app.use('/studentToApply', require('./routes/studentToApply'));

app.use('/studentToFix', require('./routes/studentToFix'));

//app.use('/student_to_manager', require('./routes/studentToManager'));

//* 告訴express監聽哪個port，以便開始第一個項目
app.listen(port, () => { 
    console.log(`Server start on http://localhost:${port}/login`);
});