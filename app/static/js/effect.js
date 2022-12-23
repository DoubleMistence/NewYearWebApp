$(function() {
    var imgs = new Array();
    var cnt = 13;       // 画像枚数
    var speed = 30;   // ミリ秒(1秒=1000)
    var now = -1;
    var timerName = null;
    var loaded_imgs = [];
    var ignition = document.querySelector("#stopButton");

    
    function preload_imgs(arrayData) {
        var loading = [];
        console.log(arrayData[2])
        for (var i = 0; i < arrayData.length; i++) {
            loading[i] = new Image();
            loading[i].src = arrayData[i];
            loading[i].onload;
        }
        return loading;
    }
    
    for (i=0; i<cnt; i++) {
        imgs[i] = "../static/img/effect" + (i+1) + ".png";
    }
    loaded_imgs = preload_imgs(imgs);
 
    //timerName = setInterval(pars2images, speed);   // 自動的に開始する場合はコメント外す
 
    // パラパラ実行
    function pars2images() {
        now++;
        if (now < 13) {
            $("#effectImage").attr('src', loaded_imgs[now].src);
        }
        now_num = now + 1;
        
        if (now >= imgs.length-1) {
            //now = -1;
            clearInterval(timerName);
            timerName = null;
        }
        
    }
 
    // ストップボタンを押されたとき
    ignition.click(function(){
        timerName = setInterval(pars2images, speed);
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