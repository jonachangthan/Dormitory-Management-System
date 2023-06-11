const db = require("./../database")

module.exports = function getSupervisorData() {   
    return new Promise((resolve, reject) => {
        sql = `SELECT manager.*, account.Permission FROM manager JOIN account ON manager.M_ID = account.UserName WHERE account.Permission = 2`
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
