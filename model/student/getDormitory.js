const db = require("./../database")

module.exports = function getDormitoryData() {   
    return new Promise((resolve, reject) => {
        sql = 'SELECT DB_Number ,DB_Name,D_Capacity,D_Cost FROM dormitory_building NATURAL join dormitory WHERE DB_Number =D_Building_No GROUP BY DB_Number'
        db.query(sql, async (error, results) => {
            results.forEach(element => {
                element.D_Capacity = element.D_Capacity+" 人房"
            })
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

