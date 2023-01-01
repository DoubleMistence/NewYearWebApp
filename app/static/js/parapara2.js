$(function() {
    var imgs = new Array();
    var cnt = list_data;       // 画像枚数
    var speed = getRandomArbitrary(roll_speed,roll_speed+5);   // ミリ秒(1秒=1000)
    var now = -1;
    var timerName;
    var result = document.querySelector("#result2");
    var loaded_imgs = [];
    var drum = document.querySelector('#reel');
    var shan = document.querySelector('#cymbal');
    var start_Button = $("#startButton");
    var effective = document.querySelector("#slot2-effect");

    var stop_Button = $("#stopButton2");
    var paraImage = $("#paraImage2");
    var reroll_btn = $("#reroll-btn");

    document.addEventListener('keypress', keypress_ivent);

    function keypress_ivent(e) {
        if(e.code === 'KeyB'){
            //Bキーが押された時の処理
            stop_Button.click();
        }
        return false; 
    }

    function getRandomArbitrary(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    drum.volume = 0.2;
    shan.volume = 0.2;

    function reel() {
        drum.play();
        drum.loop = true;
    }

    function cymbal() {
        shan.currentTime = 0; 
        drum.pause();
        shan.play();
    }
    
    function preload_imgs(arrayData) {
        var loading = [];
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
    })

    reroll_btn.click(function(){
        speed = getRandomArbitrary(roll_speed,roll_speed+5);
        stop_Button.attr('src', '../static/img/slot-stop.svg');
        effective.value = 1;
        clearInterval(timerName);
        timerName = null;
        result.value = null;
        timerName = setInterval(pars2images, speed);
        reel();
    })
    
    for (i=0; i<cnt; i++) {
        imgs[i] = "../static/img/img" + (i+1) + ".PNG";
    }
    loaded_imgs = preload_imgs(imgs);
 
    // パラパラ実行
    function pars2images() {
        drum.play();
        effective.value = 1;
        now++;
        paraImage.attr('src', loaded_imgs[now].src);

        if (now >= imgs.length-1) {
            now = -1;
        }
    }
 
    // スタートストップ
    stop_Button.click(function(){
        if (timerName) {
            cymbal();
            stop_Button.attr('src', '../static/img/slot-stop-red.svg');
            clearInterval(timerName);
            timerName = null;
            now_num = now + 1;
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
});