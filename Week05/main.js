//Canvas Element 불러오기
var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

draw();
//setInterval(draw, 1000.0/60.0)

var rotAngle = 0;

function draw()
{

    rotAngle += Math.PI / 100;
    ctx.save();
    ctx.fillStyle = "purple";
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.clearRect(-canvas.width/2.0, -canvas.height/2.0, canvas.width, canvas.height);
    ctx.rotate(rotAngle);
    ctx.fillRect(0,0,100,100);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "green";
    ctx.translate(100,100);
    ctx.rotate(rotAngle);
    ctx.fillRect(0,0,100,100);
    ctx.restore();

    requestAnimationFrame(draw);
}

// // 다음 프레임 요청(requestAnimationFrame 안쓸때)
// setInterval(draw, 1000.0/60.0);

// 다음 프레임 요청(setInterval 안쓸때)
//requestAnimationFrame(draw);
