$(function() {
    var imgs = new Array();
    var cnt = 9;       // 画像枚数
    var speed = 10;   // ミリ秒(1秒=1000)
    var now = -1;
    var timerName;
    var tmp_timerName = 111111111111;
    var result = document.querySelector("#result");

    
    for (i=0; i<cnt; i++) {
        imgs[i] = "../static/img/num" + (i+1) + ".jpg";
    }
 
    //timerName = setInterval(pars2images, speed);   // 自動的に開始する場合はコメント外す
 
    // パラパラ実行
    function pars2images() {
        now++;
        $("#paraImage").attr("src", imgs[now]);
        now_num = now + 1;
        if (now >= imgs.length-1) {
            now = -1;
        }
    }
 
    // スタートストップ
    $("#stopButton").click(function(){
        if (timerName) {
            clearInterval(timerName);
            timerName = null;
            result.textContent = now_num;
        } else {
            timerName = setInterval(pars2images, speed);
        }
    });
/*
    // ストップ
    $("#stopButton").click(function(){
        if (timerName) {
            clearInterval(timerName);
        }
    });
*/
});