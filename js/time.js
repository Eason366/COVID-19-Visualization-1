function Appendzero (obj) {
    if (obj < 10) return "0" + obj; else return obj;
}
var t = null;
t = setTimeout(time, 1000);//Begin
function time() {
    clearTimeout(t);//clear
    dt = new Date();
    var year = dt.getFullYear();
    var momth = dt.getMonth() + 1;
    var day = dt.getDate();
    var hour = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    var NowTime = year + "/" +
    Appendzero(momth)  + "/" + 
    Appendzero(day) + "-" + 
    Appendzero(hour) + ":" + 
    Appendzero(minutes) + ":" + 
    Appendzero(seconds);
    document.querySelector(".showTime").innerHTML = NowTime
    
    t = setTimeout(time, 1000); //run a loop
}