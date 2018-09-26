$(function () {
    "use strict";
    var timer = document.getElementById("timer_zone");
    var limit;
    var flag = 0;
    var alarm;
    var timerTime = [];
    $('#start').click(function () {
        var timeValue = ["workingTime", "restTime", "breakingTime"]
        var e = 0;
        for (let i = 0; i < timeValue.length; i++) {
            timerTime.push(document.getElementById(timeValue[i]).value);
            if (timerTime[i] == "") {
                e++;
            }
        }

        var confirmed = confirm("ポモドーロタイマーを発動します。準備はよろしいですか?")
        if(e != 0){
            alert("未入力の欄があります。確認して入力してください");
            confirmed = false
        }
        if (confirmed) {
            changeTurn();
            this.disabled = true
        }
    })

    $('#stop').click(function () {
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
                rotate(timerTime[2] * 60);
                break;

            case 2:
            case 4:
            case 6:
                alert("休憩時間です。5分休憩してください");
                rotate(timerTime[1] * 60);
                break;

            default:
                alert("仕事時間です。頑張って仕事してください。");
                rotate(timerTime[0] * 60);
                break;
        }
    }

    function rotate(turn) {
        var now = new Date();
        var sec = now.getTime();
        function updateTimer() {
            var current = new Date();
            var nowTime = current.getTime();
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
