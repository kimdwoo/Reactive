var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// 캔버스의 중앙 좌표 계산
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

// 캔버스의 중앙으로 이동
ctx.translate(centerX, centerY);
ctx.beginPath();

// 플레이어 모양 그리기
function drawPlayer() {
    var scale = 1;
    for (var i = 0; i < 360; i++) {
        var t = i * Math.PI / 180;
        var x = (scale * (16 * Math.pow(Math.sin(t), 3))); 
        var y = (scale * (-(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)))); 
        ctx.lineTo(x, y); 
    }
    ctx.closePath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';
    ctx.stroke(); 
    ctx.fillStyle = "rgb(192,0,0)"; // 채우기 색상 설정
    ctx.fill(); // 채우기
    ctx.restore();
}

// 플레이어의 회전 각도 초기값
var playerAngle = 0;

// 플레이어를 주기적으로 회전시키는 함수
function rotatePlayer() {
    // 캔버스를 초기화하여 이전에 그려진 내용을 지웁니다.
    ctx.clearRect(-centerX, -centerY, canvas.width, canvas.height);
    
    // 플레이어를 회전합니다.
    ctx.rotate(playerAngle * Math.PI / 180);
    
    // 플레이어를 그립니다.
    drawPlayer();
    
    // 회전한 후 캔버스의 중앙으로 복구합니다.
    ctx.rotate(-playerAngle * Math.PI / 180);

    // 플레이어의 회전 속도에 따라 각도를 변경합니다.
    playerAngle += 5;
}

// 주기적으로 플레이어를 회전시킵니다.
setInterval(rotatePlayer, 100);

// 별 그리기 함수
function drawStar(cx, cy, outerRadius, innerRadius) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        const x = cx + Math.cos(angle) * outerRadius;
        const y = cy + Math.sin(angle) * outerRadius;
        ctx.lineTo(x, y);
        const innerAngle = angle + Math.PI / 5;
        const innerX = cx + Math.cos(innerAngle) * innerRadius;
        const innerY = cy + Math.sin(innerAngle) * innerRadius;
        ctx.lineTo(innerX, innerY);
    }
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#FFFF00'; // 스트로크 색상 설정
    ctx.stroke(); // 스트로크 그리기
    ctx.fillStyle = '#FFFF00';
    ctx.fill();
    ctx.restore();
}

// 별을 새로 그리는 함수
function drawRandomStar() {
    const outerRadius = 20;
    const innerRadius = 10;
  
    // 랜덤한 위치 계산
    const randomX = Math.random() * canvas.width - centerX;
    const randomY = Math.random() * canvas.height - centerY;
  
    // 별 그리기
    drawStar(randomX, randomY, outerRadius, innerRadius);
}

// 새로고침할 때마다 별을 그립니다.
drawRandomStar();
