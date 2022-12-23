$(function() {
    var imgs = new Array();
    var cnt = 18;       // 画像枚数
    var speed = 90;   // ミリ秒(1秒=1000)
    var now = -1;
    var timerName;
    var result = document.querySelector("#result");
    var loaded_imgs = [];
    var bg = $("#loader-bg");
    var loader = $("#loader");
    var start = $("#startButton");
    var drum = document.querySelector('#reel');

    function reel() {
        drum.play();
        drum.loop = true;
    }

    function stopload() {
        bg.delay(900).fadeOut(800);
        loader.delay(900).fadeOut(300);       
    }

    function cymbal() {
        drum.loop = false;
        drum.pause();
        document.querySelector('#cymbal').play();
    }
    
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

    start.click(function(){
        timerName = setInterval(pars2images, speed);
        reel();
        stopload();
    })

    bg.removeClass('is-hide');
    loader.removeClass('is-hide');
    
    for (i=0; i<cnt; i++) {
        imgs[i] = "../static/img/img" + (i+1) + ".PNG";
    }
    loaded_imgs = preload_imgs(imgs);
    start.removeClass('is-hide');
 
    // パラパラ実行
    function pars2images() {
        now++;
        $("#paraImage").attr('src', loaded_imgs[now].src);
        now_num = now + 1;

        if (now >= imgs.length-1) {
            now = -1;
        }
    }
 
    // スタートストップ
    $("#stopButton").click(function(){
        if (timerName) {
            cymbal();
            clearInterval(timerName);
            timerName = null;
            if (now_num%2 === 1){
                result.textContent = (now_num + 1) / 2;
            } else {
                console.log(now_num);
                result.textContent = (now_num/2) % 9 + 1;
                $("#paraImage").attr('src', loaded_imgs[now_num % 17].src);
            }
            
            /*
            if (now_num%2 === 0) {
                $("#paraImage").attr('src', loaded_imgs[now_num/2+1].src);
            }
            */
        } else {
            //timerName = setInterval(pars2images, speed);
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