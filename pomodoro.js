$(function () {
    "use strict";
    var timer = document.getElementById("timer_zone");
    var sleeping = document.getElementById("sleeping");
    var limit;
    var flag = 0;
    var alarm;
    var timerTime = [];
    var username;
    $('#start').click(function () {
        var timeValue = ["workingTime", "restTime", "breakingTime"]
        var e = 0;
        for (let i = 0; i < timeValue.length; i++) {
            timerTime.push(document.getElementById(timeValue[i]).value);
            if (timerTime[i] == "") {
                e++;
            }
            username = document.getElementById("name_space").value;
        }


        if (confirm("ポモドーロタイマーを発動します。準備はよろしいですか?") && e == 0) {
            changeTurn();
            this.disabled = true
        } else if (e != 0) {
            alert("未入力の欄があります。確認して入力してください");
        }
    })

    $('#stop').click(function () {
        start.disabled = false;
        flag = 0;
        clearInterval(alarm);
    })

    function changeTurn() {
        flag++;
        console.log("flag = " + flag);
        document.getElementById('sound').play();
        switch (flag % 8) {
            case 0:
                alert("長休憩の時間です。休んでください");
                rotate(timerTime[2] * 60);
                sleeping.innerHTML = `${username}は長い休憩を取っています`
                break;

            case 2:
            case 4:
            case 6:
                alert("休憩時間です。5分休憩してください");
                sleeping.innerHTML = `${username}は今休憩中です`;
                rotate(timerTime[1] * 60);
                break;

            default:
                alert("仕事時間です。頑張って仕事してください。");
                sleeping.innerHTML = `${username}は今仕事中です(話しかけるなら休憩中に!)`;
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
        }, 200);
    }
});
