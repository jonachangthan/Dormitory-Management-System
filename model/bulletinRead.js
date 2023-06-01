const db = require("./database")

module.exports = function readBulletin() {   
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM bulletin WHERE True ORDER BY B_Number DESC;', async (error, results) => {
            results.forEach(element => {
                element.B_Date =  element.B_Date.getFullYear()+ '-' + (parseInt(element.B_Date.getMonth()) + 1) + '-' + element.B_Date.getDate()
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
