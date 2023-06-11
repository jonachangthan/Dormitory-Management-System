const db = require("./../database")

module.exports = function getManagerData() {   
    return new Promise((resolve, reject) => {
        sql = `SELECT manager.*, account.Permission FROM manager JOIN account ON manager.M_ID = account.UserName WHERE account.Permission = 1`
        db.query(sql, async (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }
            else {
                results.forEach(element => {
                    element.Permission = element.Permission == 1 ? "管理員" : "舍監";
                });
                resolve(results);
            }
        });
    });
}
