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
    var drum = document.querySelector('#reel');
    var shan = document.querySelector('#cymbal');
    var start_Button = $("#startButton");

    var stop_Button = $("#stopButton3");
    var paraImage = $("#paraImage3");

    drum.volume = 0.2;
    shan.volume = 0.2;

    function reel() {
        drum.play();
        drum.loop = true;
    }

    function stopload() {
        bg.delay(900).fadeOut(800);
        loader.delay(900).fadeOut(300);       
    }

    function cymbal() {
        shan.currentTime = 0; 
        drum.pause();
        shan.play();
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

    start_Button.click(function(){
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
    start_Button.removeClass('is-hide');
 
    // パラパラ実行
    function pars2images() {
        drum.play();
        now++;
        paraImage.attr('src', loaded_imgs[now].src);
        now_num = now + 1;

        if (now >= imgs.length-1) {
            now = -1;
        }
    }
 
    // スタートストップ
    stop_Button.click(function(){
        if (timerName) {
            cymbal();
            clearInterval(timerName);
            timerName = null;
            console.log(now_num);
            if (now_num%2 === 1){
                result.value = (now_num + 1) / 2;
            } else {
                result.value = (now_num/2) % 9 + 1;
                paraImage.attr('src', loaded_imgs[now_num % 18].src);
            }
        } else {
            //スタートに使える
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