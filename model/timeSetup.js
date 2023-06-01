// you can use class like this:

// due = require('./model/timeSetup');
// due.checkApplyDue() ? console.log('okay') : console.log('expired');

class checkDue {
    // 學期開始結束時間
    static semesterStartDate = new Date('2023-09-01T00:00:00Z');
    static semesterCloseDate = new Date('2024-02-01T23:59:59Z');

    // 住宿申請開放時間
    static applyOpeningDate = new Date('2023-06-01T00:00:00Z');
    static applyDueDate = new Date('2023-06-30T23:59:59Z');

    // 繳費deadline
    static paymentDueDate = new Date('2023-09-30T23:59:59Z');

    // 退換宿申請開放時間
    static exitExchanegOpeningDate = new Date('2023-06-01T00:00:00Z');
    static exitExchanegDueDate = new Date('2023-06-30T23:59:59Z');

    static currentDate = new Date();

    static checkApplyDue(){
        // console.log("current date : ", checkDue.currentDate)
        console.log("apply opening date : ", checkDue.applyOpeningDate)
        if(checkDue.currentDate > checkDue.applyOpeningDate && checkDue.currentDate < checkDue.applyDueDate){
            return true
        }else{
            return false
        }
    }

};

module.exports = checkDue;
