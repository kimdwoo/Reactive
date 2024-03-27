var canvas = document.getElementById("studentID");
var ctx = canvas.getContext("2d");

// 각 숫자를 LCD 스타일로 그리는 함수
function drawNumber(x, y, number) {
    // 숫자 디자인 설정
    var digitWidth = 40; // 숫자 하나의 폭
    var digitHeight = 80; // 숫자 하나의 높이
    var lineWidth = 5; // 선의 두께
    var lineSpacing = 10; // 선 간 간격

    // 0은 선이 그려지지 않음, 1은 선이 그려짐
    var lines = [
        [1, 1, 1, 1, 1, 1, 0], // 0
        [0, 1, 1, 0, 0, 0, 0], // 1
        [1, 1, 0, 1, 1, 0, 1], // 2
        [1, 1, 1, 1, 0, 0, 1], // 3
        [0, 1, 1, 0, 0, 1, 1], // 4
        [1, 0, 1, 1, 0, 1, 1], // 5
        [0, 0, 1, 1, 1, 1, 1], // 6
        [1, 1, 1, 0, 0, 0, 0], // 7
        [1, 1, 1, 1, 1, 1, 1], // 8
        [1, 1, 1, 1, 0, 1, 1]  // 9
    ];

    ctx.lineWidth = lineWidth;

    // 각 숫자의 선을 그림
    for (var i = 0; i < 7; i++) {
        if (lines[number][i]) {
            ctx.beginPath();
            if (i === 0) { 
                ctx.moveTo(x + lineWidth / 2, y);
                ctx.lineTo(x + digitWidth - lineWidth / 2, y);
            } else if (i === 1) { 
                ctx.moveTo(x + digitWidth, y + lineWidth / 2);
                ctx.lineTo(x + digitWidth, y + digitHeight / 2 - lineWidth / 2);
            } else if (i === 2) { 
                ctx.moveTo(x + digitWidth, y + digitHeight / 2 + lineWidth / 2);
                ctx.lineTo(x + digitWidth, y + digitHeight - lineWidth / 2);
            } else if (i === 3) { 
                ctx.moveTo(x + lineWidth / 2, y + digitHeight);
                ctx.lineTo(x + digitWidth - lineWidth / 2, y + digitHeight);
            } else if (i === 4) { 
                ctx.moveTo(x, y + digitHeight / 2 + lineWidth / 2);
                ctx.lineTo(x, y + digitHeight - lineWidth / 2);
            } else if (i === 5) { 
               
                ctx.moveTo(x, y + lineWidth / 2);
                ctx.lineTo(x, y + digitHeight / 2 - lineWidth / 2);
            } else if (i === 6) { 
                ctx.moveTo(x + lineWidth / 2, y + digitHeight / 2);
                ctx.lineTo(x + digitWidth - lineWidth / 2, y + digitHeight / 2);
            }
            ctx.stroke();
        }
    }
}

// 학번을 LCD 스타일로 그리는 함수
function drawStudentID() {
    var studentID = document.getElementById("studentIDInput").value;
    if (studentID !== "") {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 학번의 길이와 각 숫자의 간격 설정
        var digitWidth = 40; // 숫자 하나의 폭
        var digitSpacing = 20; // 숫자 간 간격
        var offsetX = (canvas.width - (digitWidth + digitSpacing) * studentID.length + digitSpacing) / 2; // 왼쪽으로부터의 간격
        var offsetY = (canvas.height - 80) / 2; // 위쪽으로부터의 간격

        for (var i = 0; i < studentID.length; i++) {
            drawNumber(offsetX + i * (digitWidth + digitSpacing), offsetY, parseInt(studentID[i]));
        }
    } else {
        alert("학번을 입력하세요.");
    }
}