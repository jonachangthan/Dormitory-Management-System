var submit = document.getElementById("submit")
var num = document.getElementById("num")
var stuname = document.getElementById("stuname")
var slocation = document.getElementById("location")
var type = document.getElementById("type")
var content = document.getElementById("content")
var phonenum = document.getElementById("phonenum")
var email = document.getElementById("email")

submit.addEventListener("click", (event) => {
    if (num.value == "") {
        alert("請選擇學號")
    }
    else if (stuname.value == "") {
        alert("請選擇姓名")
    }
    else if (slocation.value == "") {
        alert("請填寫地點")
    }
    else if (type.value == "") {
        alert("請填寫項目")
    }
    else if (content.value == "") {
        alert("請填寫內容")
    }
    else if (phonenum.value == "") {
        alert("請填寫電話")
    }
    else if (email.value == "") {
        alert("請填寫email")
    }
})