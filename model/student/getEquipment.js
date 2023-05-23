const db = require("./../database")

module.exports = function getEquipmentData(data) {   
    return new Promise((resolve, reject) => {
        userName = data.user.UserName
        sql = 'SELECT E_Type,E_D_Quantity ,E_D_Condition,E_D_Dormitory_No,E_D_Building_No,E_D_Equipment_No From student NATURAL JOIN equipment_in_dormitory NATURAL JOIN equipment WHERE S_ID ='+'"'+userName+'"'+' AND S_Dormitory_No = E_D_Dormitory_No AND S_Building_No = E_D_Building_No AND E_D_Equipment_No = E_Number'
        db.query(sql, async (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }
            else {
                console.log(results);
                resolve(results,sql);
            }
        });
    });
}
