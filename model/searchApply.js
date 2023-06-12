const db = require("./database")

module.exports = function searchApply(sql) {   
    return new Promise((resolve, reject) => {
        db.query(sql, (error, results) => {         
            results.forEach(element => {
                element.A_Date = element.A_Date.getFullYear()+ '-' + (parseInt(element.A_Date.getMonth()) + 1) + '-' + element.A_Date.getDate()
                if(element.A_Approval==2){
                    element.A_Approval = "尚未審核"
                    element.boolean = true
                }
                else{
                    if(element.A_Approval==1){
                        element.A_Approval = "已核可"
                    }else{
                        element.A_Approval = "未核可"
                    }
                    element.boolean = false
                    
                } 
                if(element.A_Bill==0){
                    element.A_Bill = "未繳交"
                }else{
                    element.A_Bill = "已繳交"
                }
                if(element.A_Bill == "未繳交" && element.A_Approval=="已核可"){
                    element.pay = false
                }else{
                    element.pay = true
                }
                
            });
            if (error) {
                console.log(error);
                reject(error);
                return;
            }
            else {
                resolve(results);
            }
        })
    })
}


