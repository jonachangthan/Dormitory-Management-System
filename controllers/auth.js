const db = require('../model/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendMail = require('../mail');

// res.render: 用於呈現View，並將呈現的HTML字符串發送給Client端
/*
exports.register = (req, res) => {
    //* 抓取所有從表單發送之數據，將它們顯示至我們的終端
    // console.log(req.body);

    //* 將表單數據指派給變數
    const { username, password, confirm_password } = req.body;

    //* 執行 SQL Select
    db.query('SELECT username FROM account WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.log(error);
        }

        //* 若查詢的到表示資料庫內已有此帳號
        if (results.length > 0) {
            return res.render('register', {
                message: '此用戶名已被使用!'
            });
        }
        else if (password !== confirm_password) {
            return res.render('register', {
                message: '[密碼]需與[確認密碼]相符!'
            });
        }

        //* 明碼雜湊成暗碼
        let hashed_password = await bcrypt.hash(password, 10); // 雜湊10次，需等待雜湊時間，因此需設置async

        //* 將帳號、雜湊密碼存入資料庫中
        db.query('INSERT INTO account SET ?', { username: username, password: hashed_password }, (error, results) => {
            if (error) {
                console.log(error);
            }
            else {
                return res.render('register', {
                    message: '註冊成功!'
                });
            }
        });
    });
}
*/
exports.login = async (req, res) => {
    //* 抓取所有從表單發送之數據，將它們顯示至我們的終端
    // console.log(req.body);

    //* 將表單數據指派給變數
    const { username, password } = req.body;

    //* 執行 SQL Select
    db.query('SELECT * FROM account WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.log(error);
        }

        //* 查詢不到帳號
        if (!results[0]) {
            return res.status(401).render('login', {
                message: '此用戶不存在!'
            });
        }

        //* 將前段輸入之密碼和資料庫中的密碼進行比對
        //* 若比對正確
        if (await bcrypt.compare(password, results[0].Password)) { // 需大寫
            //* 產生Token並存放在Cookie中
            const payload = {
                id: results[0].ID,
                username: results[0].UserName,
                permission: results[0].Permission
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES // Token到期時長
            });
            const cookieOptions = {
                expiresIn: new Date( // Cookie到期時間
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000 // 以ms為單位
                ),
                httpOnly: true // 此cookie只能從server端訪問
            }

            //* 使API主動回傳Cookie
            res.cookie('JWT_token', token, cookieOptions);

            //* HTTP request已完成(200 OK)，導向主頁
            res.status(200).redirect("/");
        }
        else {
            return res.status(401).render('login', {
                message: '密碼錯誤!'
            });
        }
    });
}

exports.logout = (req, res) => {
    res.clearCookie('JWT_token');
    res.redirect("/");
}

exports.change_password = (req, res) => {
    //* 抓取所有從表單發送之數據，將它們顯示至我們的終端
    // console.log(req.body);

    //* 將表單數據指派給變數
    const { username, old_password, new_password, confirm_new_password } = req.body;

    //* 執行 SQL Select
    db.query('SELECT * FROM account WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.log(error);
        }

        //* 查詢不到帳號
        if (!results[0]) {
            return res.status(401).render('change_password', {
                message: '此用戶不存在!'
            });
        }

        //* 將前段輸入之舊密碼和資料庫中的密碼進行比對
        //* 若比對正確
        if (await bcrypt.compare(old_password, results[0].Password)) { // 需大寫
            //* 比對新密碼與確認新密碼
            if (new_password !== confirm_new_password) {
                return res.render('change_password', {
                    message: '[新密碼]需與[確認新密碼]相符!'
                });
            }

            //* 明碼雜湊成暗碼
            let hashed_password = await bcrypt.hash(new_password, 10); // 雜湊10次，需等待雜湊時間，因此需設置async

            //* 將更改後密碼存入資料庫中
            db.query('UPDATE account SET ? WHERE  ?', [{ Password: hashed_password }, { UserName: username }], (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    return res.render('login', {
                        message: '更改成功，請重新登入!'
                    });
                }
            });
        }
        //* 若比對錯誤
        else {
            return res.status(401).render('change_password', {
                message: '舊密碼錯誤!'
            });
        }
    });
}

exports.forget_password = (req, res) => {
    //* 抓取所有從表單發送之數據，將它們顯示至我們的終端
    // console.log(req.body);

    //* 將表單數據指派給變數
    const { username, email } = req.body;

    //* 執行 SQL Select
    db.query('SELECT * FROM account WHERE username = ?', [username], async (error, result1) => {
        if (error) {
            console.log(error);
        }

        //* 查詢不到帳號
        if (!result1[0]) {
            return res.status(401).render('forget_password', {
                message: '此用戶不存在!'
            });
        }

        //* 比對email是否正確
        db.query('SELECT b.email, b.name FROM account as a, \
        (SELECT S_ID as id, S_Email as email, S_Name as name FROM student UNION(SELECT M_ID as id, M_Email as email, M_Name as name FROM manager)) as b \
        WHERE a.UserName = b.id and a.UserName = ?', [username], async (error, result2) => {
            if (error) {
                console.log(error);
            }

            if (result2[0].email !== email) {
                return res.render('forget_password', {
                    message: 'Email錯誤!'
                });
            }
            //* 若正確生成Email
            else {
                let mailSubject = 'Forget Password';
                //const randomString = randomstring.generate();
                let content = '<p>' + result2[0].name + '您好:\n \
                請點選此<a href="http://127.0.0.1:5500/auth/reset_password?token=' + username + '">連結</a>來重置密碼</p>';

                sendMail(email, mailSubject, content);

                return res.status(200).render('login', {
                    message: '請至Email點選連結重置密碼!'
                });
            }
        });
    });
}

exports.reset_password = async (req, res) => {
    const username = req.query.token;
    //console.log(username);

    //* 明碼雜湊成暗碼
    let hashed_password = await bcrypt.hash(username, 10); // 雜湊10次，需等待雜湊時間，因此需設置async

    //* 將更改後密碼存入資料庫中
    db.query('UPDATE account SET ? WHERE  ?', [{ Password: hashed_password }, { UserName: username }], (error, results) => {
        if (error) {
            console.log(error);
        }
        else {
            return res.render('login', {
                message: '重置成功，請重新登入!'
            });
        }
    });
}