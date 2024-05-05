//하트를 그리기
//별 그리기 
//하트 회전
//별을 새로고침 할때마다 새로운 위치
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var starX , starY;
var playerX = canvas.width / 2;
var playerY = canvas.height / 2;
var playerSpeed = 2;
var playerAngle = 0;
var rotationSpeed = 0.1;
var monsters= [];

function drawstar(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x + 8, y - 10);
    ctx.lineTo(x + 26, y - 5);
    ctx.lineTo(x + 11, y + 8);
    ctx.lineTo(x + 21, y + 27);
    ctx.lineTo(x, y + 13);
    ctx.lineTo(x - 21, y + 27);
    ctx.lineTo(x - 11, y + 8);
    ctx.lineTo(x - 28, y - 4);
    ctx.lineTo(x - 7, y - 9);
    ctx.closePath();
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
}
function drawHeart(x, y , angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle); 
    ctx.beginPath();
    ctx.moveTo(0, -30);
    for (var i = 0; i < 360; i++) {
        var t = i * Math.PI / 180;
        var x = 16 * Math.pow(Math.sin(t), 3);
        var y = - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        ctx.lineTo(x, y); // 각도에 해당하는 좌표로 선을 그림
    }
    ctx.fillStyle = 'rgb(192, 0, 0)'; 
    ctx.strokeStyle = 'black'; 
    ctx.lineWidth = 2; 
    ctx.fill();
    ctx.stroke();
    ctx.restore(); 
}

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
function update(){
    clearCanvas();
    var offsetX = canvas.width / 2 - playerX;
    var offsetY =  canvas.height / 2 - playerY;
    ctx.translate(offsetX, offsetY);
    drawHeart(canvas.width/2,canvas.height/2,playerAngle);
    drawstar(starX,starY);
    drawmonsters();
}
function autoRotate() {
    playerAngle += rotationSpeed;
    update();
    requestAnimationFrame(autoRotate);
}
var startButton = document.getElementById('btn');
        startButton.addEventListener('click', function() {
            startButton.style.display = 'none'; 
            document.getElementById('total').style.border = 'none'; 
            document.getElementById('canvastext').classList.add('hidden'); 
            var monsterCount = Math.floor(Math.random() * 11) + 5; 
            for (var i = 0; i < monsterCount; i++) {
                createmonster();
            }
            drawRandomStar(); 
            autoRotate();
            setInterval(function() {
                createmonster();
            }, 1000);
        });
function drawRandomStar(){
    starX = Math.random() *canvas.width;
    starY = Math.random()* canvas.height;
    update();
}

function createmonster(){
    var angle = Math.random() * Math.PI *2;
    var startX = Math.random()<0.5?-100 : canvas.width + 100;
    var startY = Math.random() *canvas.height;
    var speed = Math.random() * 3+1;
    var monster = {
        x: startX,
        y: startY,
        radius: Math.random() * 10 +5,
        color: getRandomColor(),
        speed: speed
    };
    monster.speedX = Math.cos(angle) * monster.speed;
    monster.speedY = Math.sin(angle) * monster.speed;
    monsters.push(monster);
}
function drawmonsters(){
for(var i = 0;i<monsters.length;i++ ){
    var monster = monsters[i];
    moveToCenter(monster);
    drawCircle(monster.x,monster.y,monster.radius,monster.color);
    if(Colliding(monster)){
        monsters.splice(i,1);
        i--;
        }
    }
}
function moveToCenter(monster) {
    var dx = canvas.width / 2 - monster.x;
    var dy = canvas.height / 2 - monster.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var speed = monster.speed; 
    if (distance > 1) {
    monster.x += dx / distance * speed;
    monster.y += dy / distance * speed;
    }
}
function Colliding(monster){
    var dx = playerX - monster.x;
    var dy = playerY - monster.y;
    var distance = Math.sqrt(dx*dx*dy*dy);
    return distance < monster.radius + 30;
}

function getRandomColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color; 
    ctx.fill();
    ctx.closePath();
}

    
