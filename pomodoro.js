

$(function () {
    "use strict";
    var timer = document.getElementById("timer_zone");
    var nowTime;
    var limit;
    var flag = 0;
    var working = 5;
    var rest = 3;
    var breaking = rest + 8;
    var alarm;
    $('#start').click(function () {
        var confirmed = confirm("ポモドーロタイマーを発動します。準備はよろしいですか?")
        if (confirmed) {
            changeTurn();
            this.disabled = true
        }
    })

    $('#stop').click(function (){
        start.disabled = false;
        flag = 0;
        clearInterval(alarm);
        timer.innerHTML = "0分0秒"; 
    })

    function changeTurn() {
        flag++;
        console.log("flag = " + flag);
        switch (flag % 8) {
            case 0:
                alert("長休憩の時間です。休んでください");
                rotate(breaking);
                break;

            case 2:
            case 4:
            case 6:
                alert("休憩時間です。5分休憩してください");
                rotate(rest);
                break;

            default:
                alert("仕事時間です。頑張って仕事してください。");
                rotate(working);
                break;
        }
    }

    function getSecond() {
        var current = new Date();
        nowTime = current.getTime();
        return nowTime;
    }

    function rotate(turn) {
        var now = new Date();
        var sec = now.getTime();
        function updateTimer() {
            getSecond();
            var later = nowTime - sec;
            limit = Math.floor(turn - (later / 1000));
            timer.innerHTML = Math.floor(limit / 60) + "分" + Math.floor(limit % 60) + "秒";
            console.log(limit);
        }
        alarm = setInterval(function () {
            updateTimer();
            if (limit <= 0) {
                clearInterval(alarm);
                changeTurn();
            };
        }, 10);
    }
});
