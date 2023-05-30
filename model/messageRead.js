const db = require("./database")

module.exports = function readMessage() {   
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM message WHERE True ORDER BY M_Number DESC;', async (error, results) => {
            results.forEach(element => {
                element.M_Date =  element.M_Date.getFullYear()+ '-' + (parseInt(element.M_Date.getMonth()) + 1) + '-' + element.M_Date.getDate()
            });
            if (error) {
                console.log(error);
                reject(error);
                return;
            }
            else {
                // console.log(results);
                resolve(results);
            }
        });
    });
}