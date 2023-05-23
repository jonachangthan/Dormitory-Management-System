var up = document.getElementById("up")

// 置頂按鈕顯示
window.onscroll=function(){
    var srcTop=(document.body.scrollTop|| document.documentElement.scrollTop);
    if(srcTop>=200){
        up.style.display='block'
    }
    else{
        up.style.display='none'
    }
}