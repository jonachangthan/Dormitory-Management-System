const db = require("./../database");

module.exports = function getStudentDormitoryInfo(studentId) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT DISTINCT db.DB_Name, d.D_Number
      FROM student s, dormitory d, dormitory_building db
      WHERE s.S_Dormitory_No = d.D_Number
        AND s.S_Building_No = db.DB_Number
        AND s.S_ID = ?;
    `;
    
    db.query(query, [studentId], (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        result = results[0].DB_Name + " " + results[0].D_Number + "號房";
        resolve(result || null);
      }
    });
  });
};
