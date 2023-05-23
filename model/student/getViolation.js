const db = require("./../database")

module.exports = function getViolationData(data) {   
    return new Promise((resolve, reject) => {
        userName = data.user.UserName
        db.query('SELECT * From violation_record Where VR_Student_ID ='+'"'+userName+'"', async (error, results) => {
            results.forEach(element => {
                element.VR_Date = element.VR_Date.getFullYear()+ '-' + (parseInt(element.VR_Date.getMonth()) + 1) + '-' + element.VR_Date.getDate()
            })
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
