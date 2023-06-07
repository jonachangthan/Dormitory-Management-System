var S_ID = document.getElementById("S_ID")
var S_Name = document.getElementById("S_Name")
var S_Sex = document.getElementById("S_Sex")
var S_Academic = document.getElementById("S_Academic")
var S_Department = document.getElementById("S_Department")
var phone = document.getElementById("S_Phone")
var email = document.getElementById("S_Email")

var submitform = document.getElementById("submitform")
var add = document.getElementById("add")

add.addEventListener("click", (event) => {
    if (S_ID.value == "") {
        alert("請輸入學號")
    }
    else if (S_Name.value == "") {
        alert("請填寫姓名")
    }
    else if (S_Sex.value == "選擇性別") {
        alert("請選擇性別")
    }
    else if (S_Academic.value == "") {
        alert("請填寫學年度")
    }
    else if (S_Department.value == "選擇系所") {
        alert("請選擇系所")
    }
    else if (phone.value == "") {
        alert("請填寫電話")
    }
    else if (email.value == "") {
        alert("請填寫email")
    }
    else{
        submitform.submit()
    }
})

