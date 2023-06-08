const db = require('../model/database');
const readBulletin = require('../model/bulletinRead');
const readMessage = require('../model/messageRead');

exports.writeBulletin = (req, res) => {
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
                    return res.render('supervisor_to_message', {
                        Bmessage:BresContent,
                        Mmessage:MresContent,
                    });
                }
            })
        })
    });
}

exports.writeMessage = (req, res) => {
    const { title, content } = req.body;
    BresContent = {}
    MresContent = {}
    date = new Date()
    Mdate = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate()
    Mtime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    db.query('INSERT INTO message SET ?', {M_Content: content, M_Date: Mdate, M_Time: Mtime , M_Student_ID : req.user.UserName,M_Title:title}, (error, results) => {
        readBulletin().then(Bresult => {
            readMessage().then(Mresult =>{
                BresContent = Bresult
                MresContent = Mresult
                if (error) {
                    console.log(error);
                }
                else {
                    return res.render('supervisor_to_message', {
                        Bmessage:BresContent,
                        Mmessage:MresContent,
                    });
                }
            })
        })
    });
}

exports.delete = (req, res) => {

}

exports.modify = (req, res) => {
    
}
