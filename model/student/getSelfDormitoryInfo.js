const db = require("./../database");

module.exports = function getStudentDormitoryInfo(data) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM student , dormitory_building, dormitory  Where (S_building_No = DB_Number OR S_building_No is NULL)  AND DB_Number = D_Building_No AND (S_Dormitory_No = D_Number OR S_Dormitory_No is NULL) AND S_ID = '+'"'+data.user.UserName+'" GROUP BY S_ID;'
    console.log("data",data.user)
    console.log("query",query)
    db.query(query, (error, results) => {
        //console.log("resuilt1".results);
      if (error) {
        console.log(error);
        reject(error);
      } 
      else {
        //console.log("resuilt1".results);
        results.forEach(element => {
            console.log(element)
            if(element.S_Building_No ==null){
              element.DB_Name = "";
              element.D_Capacity = "";
            }
            const query2 = 'SELECT * FROM student  Where S_Building_No = '+element.S_Building_No+' AND S_Dormitory_No = '+element.S_Dormitory_No+ ' AND S_ID != '+'"'+element.S_ID+'"'
            db.query(query2, (error, results2) => {
                element.roomate = results2;
                results.forEach(element2 => {
                    console.log(element2)
                });
                console.log("result2",results2);
                if (error) {
                  console.log(error);
                  reject(error);
                } else {
                  resolve(results);
                }
            });
        });
        resolve(results);
        // const query2 = 'SELECT * FROM student  Where S_Building_No = '+results[0].S_Building_No+' AND S_Dormitory_No = '+results[0].S_Dormitory_No+ ' AND S_ID != '+results[0].S_ID
        // db.query(query2, (error, results2) => {
        //     results.forEach(element => {
        //         element.roommate = results2
        //     });
        //     console.log("result2",results);
        //     if (error) {
        //       console.log(error);
        //       reject(error);
        //     } else {
        //       resolve(results);
        //     }
        // });
      }
    });
  });
};
