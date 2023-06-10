var studentID = document.getElementById("studentID")
var sname = document.getElementById("sname")
var academicYear = document.getElementById("academicYear")
var sex = document.getElementById("sex")
var building = document.getElementById("building")
var room = document.getElementById("room")



var query = document.getElementById("query")
var submitform = document.getElementById("submitform")

query.addEventListener("click", (event) => {
    if (studentID.value == "" && sname.value == "" && academicYear.value== "選擇學年度" && sex.value== "選擇性別" && building.value== "選擇大樓" && room.value=="")  {
        alert("請輸入至少一項資訊")
    }
    
    else{
        submitform.submit()
    }
})

// var search1 = document.getElementById("search")
// var building = document.getElementById("building")
// var room = document.getElementById("room")
// var submitform = document.getElementById("submitform")

// search1.addEventListener("click", (event) => {
//     if (building.value == "選擇大樓") {
//         alert("請選擇大樓名稱")
//     }
//     else if (room.value == "") {
//         alert("請填寫房間名稱")
//     }
//     else{
//         submitform.submit()
//     }
// })


// search1.addEventListener("click", (event) => {
//     if (checkbox.value=="1")  {
//         finish.style.display
//     }
    
  
// })
