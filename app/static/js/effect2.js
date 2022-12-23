$(function() {
    var imgs = new Array();
    var cnt = 13;       // 画像枚数
    var speed = 30;   // ミリ秒(1秒=1000)
    var now = -1;
    var timerName = null;
    var loaded_imgs = [];
    var go = 0;

    var ignition = $("#stopButton2");
    var effectimage = $("#effectImage2");

    
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
        if (now < 13) {
            now++;
            effectimage.attr('src', loaded_imgs[now].src);
        }
        
        if (now >= imgs.length-1) {
            clearInterval(timerName);
            timerName = null;
            now = 0;
        }
        
    }
 
    // ストップボタンを押されたとき
    ignition.click(function(){
        if (go === 0) {
            timerName = setInterval(pars2images, speed);
            go = 1;
        } else {
            //ここを有効にして連続でボタンを押せるようにする
            //go = 0;
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