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

exports.delete = (req, res) => {
    const { B_Number } = req.body;
  
    db.query('DELETE FROM bulletin WHERE B_Number = ?', [B_Number], (error, results) => {
      if (error) {
        console.log(error);
        return res.render('error');
      }
  
      readBulletin()
        .then(Bresult => {
            const BresContent = Bresult;
            return res.render('manager_to_message', {
              Bmessage: BresContent,
          });
        })
        .catch(error => {
          console.log(error);
          return res.render('error')
        });
    });
};
  

exports.modify = (req, res) => {
    const { B_Number, title, content } = req.body;
  
    db.query(
      'UPDATE bulletin SET B_Title = ?, B_Content = ? WHERE B_Number = ?',
      [title, content, B_Number],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ success: false, message: 'Failed to update bulletin' });
        }
  
        readBulletin()
          .then(Bresult => {
              const BresContent = Bresult;
              return res.render('manager_to_message', {
                Bmessage: BresContent,
            });
          })
          .catch(error => {
            console.log(error);
            return res
              .status(500)
              .json({ success: false, message: 'Failed to fetch updated bulletin and message' });
          });
      }
    );
  };
  

