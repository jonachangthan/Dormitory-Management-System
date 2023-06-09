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
    const M_Number  = req.body.number;

    db.query('DELETE FROM message WHERE M_Number = ?', [M_Number], (error, results) => {
      if (error) {
        console.log(error);
        return res.render('error');
      }
  
      readBulletin()
        .then(Bresult => {
          readMessage().then(Mresult => {
            const BresContent = Bresult;
            const MresContent = Mresult;
            return res.render('supervisor_to_message', {
              Bmessage: BresContent,
              Mmessage: MresContent,
            });
          });
        })
        .catch(error => {
          console.log(error);
          return res.render('error');
        });
    });
  };
  


exports.modify = (req, res) => {
    const { M_Number, M_Title, M_Content } = req.body;
    db.query(
      'UPDATE message SET M_Title = ?, M_Content = ? WHERE M_Number = ?',
      [M_Title, M_Content, M_Number],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.render('error');
        }
  
        readBulletin()
          .then(Bresult => {
            readMessage().then(Mresult => {
              const BresContent = Bresult;
              const MresContent = Mresult;
              return res.render('supervisor_to_message', {
                Bmessage: BresContent,
                Mmessage: MresContent,
              });
            });
          })
          .catch(error => {
            console.log(error);
            return res.render('error');
          });
      }
    );
  };

