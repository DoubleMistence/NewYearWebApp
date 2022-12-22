$(function() {
    var imgs = new Array();
    var img_objects = new Array();
    var cnt = 18;       // 画像枚数
    var speed = 50;   // ミリ秒(1秒=1000)
    var now = -1;
    var timerName;
    var result = document.querySelector("#result");
    var loaded_imgs = [];

    
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
        imgs[i] = "../static/img/img" + (i+1) + ".PNG";
    }
    console.log(imgs.length)
    loaded_imgs = preload_imgs(imgs);
    console.log(loaded_imgs)
 
    //timerName = setInterval(pars2images, speed);   // 自動的に開始する場合はコメント外す
 
    // パラパラ実行
    function pars2images() {
        now++;
        //$("#paraImage").attr("src", imgs[now]);
        $("#paraImage").attr('src', loaded_imgs[now].src);
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
                //$("#paraImage").attr("src", imgs[new_num]);
                $("#paraImage").attr('src', loaded_imgs[now_num].src);
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