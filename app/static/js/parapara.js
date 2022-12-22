$(function() {
    var imgs = new Array();
    var cnt = 18;       // 画像枚数
    var speed = 400;   // ミリ秒(1秒=1000)
    var now = -1;
    var timerName;
    var result = document.querySelector("#result");
    var new_num;

    
    for (i=0; i<cnt; i++) {
        imgs[i] = "../static/img/スライド" + (i+1) + ".PNG";
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
            result.textContent = Math.round(now_num/2);
            if (now_num%2 === 1) {
                new_num = now_num;
                $("#paraImage").attr("src", imgs[new_num]);
                console.log(now_num%2);
            }
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