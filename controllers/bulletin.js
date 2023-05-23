const db = require('../model/database');
//const token = require("token.js");
const readBulletin = require('../model/bulletinRead');
const readMessage = require('../model/messageRead');

exports.write = (req, res) => {
    const { title, content } = req.body;
    ans = {}
    date = new Date()
    Bdate = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate()
    Btime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    db.query('INSERT INTO bulletin SET ?', {B_Content: content, B_Date: Bdate, B_Time: Btime , B_Manager_ID : req.user.UserName, B_Title:title}, (error, results) => {
        readBulletin().then(Bresult => {
            readMessage().then(Mresult =>{
                BresContent = Bresult
                MresContent = Mresult
                if (error) {
                    console.log(error);
                }
                else {
                    return res.render('manager_to_message', {
                        Bmessage:BresContent,
                        Mmessage:MresContent,
                    });
                }
            })
        })
    });
}