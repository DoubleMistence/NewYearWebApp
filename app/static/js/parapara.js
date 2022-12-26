$(function() {
    var imgs = new Array();
    var cnt = 18;       // 画像枚数
    var roll_speed = Number(document.querySelector("#roll_speed").value);
    var speed = getRandomArbitrary(roll_speed,roll_speed+5);   // ミリ秒(1秒=1000)
    var btns_url = [
        '../static/img/reroll-off.svg',
        '../static/img/reroll-on.svg',
        '../static/img/slot-stop.svg',
        '../static/img/slot-stop-red.svg'
    ];
    var btns = [];
    var now = -1;
    var timerName;
    var result = document.querySelector("#result");
    var result2 = document.querySelector("#result2");
    var result3 = document.querySelector("#result3");
    var loaded_imgs = [];
    var bg = $("#loader-bg");
    var loader = $("#loader");
    var drum = document.querySelector('#reel');
    var shan = document.querySelector('#cymbal');
    var start_Button = $("#startButton");
    var effective = document.querySelector("#slot1-effect");

    var stop_Button = $("#stopButton");
    var paraImage = $("#paraImage");
    var reroll_btn = $("#reroll-btn");

    go = 0;
    document.addEventListener('keypress', keypress_ivent);

    function keypress_ivent(e) {
        if(e.code === 'KeyV'){
            //Vキーが押された時の処理
            stop_Button.click();
        } else if(e.code === 'Space'){
            //Spaceキーが押された時の処理
            if (go === 0) {
                start_Button.click();
                go = 1;
            }
        } else if(e.code === 'KeyA'){
            //Aキーが押された時の処理
            reroll_btn.click();
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
        for (var i = 0; i < arrayData.length; i++) {
            loading[i] = new Image();
            loading[i].src = arrayData[i];
            loading[i].onload;
        }
        for (var i = 0; i < btns_url.length; i++) {
            btns[i] = new Image();
            btns[i].src = btns_url[i];
            btns[i].onload;
        }
        return loading;
    }

    start_Button.click(function() {
        timerName = setInterval(pars2images, speed);
        reel();
        stopload();
    })

    reroll_btn.click(function() {
        reroll_btn.attr('src', btns[1].src);
        roll_speed = Number(document.querySelector("#roll_speed").value);
        speed = getRandomArbitrary(roll_speed,roll_speed+5);
        stop_Button.attr('src', btns[2].src);
        effective.value = 1;
        now = -1;
        clearInterval(timerName);
        timerName = null;
        result.value = null;
        timerName = setInterval(pars2images, speed);
        reel();
        setTimeout(function(){reroll_btn.attr('src', btns[0].src)},1000);
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
            stop_Button.attr('src', btns[3].src);
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