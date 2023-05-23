var submitbutton=document.getElementById("submitButton")
var email=document.getElementById("email")
var phone=document.getElementById("phone")


submitbutton.addEventListener("click", (event) => {
    if (email.value == "") {
        alert("請輸入email")
    }
    if (phone.value == "") {
        alert("請輸入電話")
    }
})

