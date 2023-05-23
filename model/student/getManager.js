const db = require("./../database")

module.exports = function getManagerData() {   
    return new Promise((resolve, reject) => {
        db.query('SELECT * From manager;', async (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }
            else {
                console.log(results);
                resolve(results);
            }
        });
    });
}
