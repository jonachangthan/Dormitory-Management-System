const db = require("./../database")

module.exports = function getManagerData() {   
    return new Promise((resolve, reject) => {
        sql = `SELECT manager.*, account.Permission FROM manager JOIN account ON manager.M_ID = account.UserName Where Permission = 2 `
        db.query(sql, async (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }
            else {
                resolve(results);
            }
        });
    });
}