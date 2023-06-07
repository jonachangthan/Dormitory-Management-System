var id = document.getElementById("id")
var mname = document.getElementById("mname")
var phone = document.getElementById("phone")
var email = document.getElementById("email")
var submitform = document.getElementById("submitform")
var add = document.getElementById("add")

add.addEventListener("click", (event) => {
    if (id.value == "") {
        alert("請輸入管理員編號")
    }
    else if (mname.value == "") {
        alert("請填寫姓名")
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

