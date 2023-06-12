
var search1 = document.getElementById("search1")
var building = document.getElementById("building")
var room = document.getElementById("room")
var submitform = document.getElementById("submitform")

search1.addEventListener("click", (event) => {
    if (building.value == "選擇大樓") {
        alert("請選擇大樓名稱")
    }
    else if (room.value == "") {
        alert("請填寫房間名稱")
    }
    else{
        submitform.submit()
    }
})



