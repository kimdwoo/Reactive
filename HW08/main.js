var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var starX, starY;
var playerX = canvas.width / 2;
var playerY = canvas.height / 2;
var playerSpeed = 3;
var playerAngle = 0;
var rotationSpeed = 0.1;
var monsters = [];
var starspeed = 3;
var heart = 3;
var shieldActive = false;
var shieldRadius = 0;
var shieldTime = 2000; // 쉴드 지속 시간 (ms)
var shieldGrowthRate = 0.4; // 쉴드 성장 속도
var animationId;
var intervalId;
var gameEnd = false;
var keys = {};

document.addEventListener('keydown', function(event) {
    keys[event.code] = true;
});

document.addEventListener('keyup', function(event) {
    keys[event.code] = false;
});

function movePlayer() {
    if (keys['ArrowUp'] || keys['KeyW']) {
        playerY -= playerSpeed;
    }
    if (keys['ArrowDown'] || keys['KeyS']) {
        playerY += playerSpeed;
    }
    if (keys['ArrowLeft'] || keys['KeyA']) {
        playerX -= playerSpeed;
    }
    if (keys['ArrowRight'] || keys['KeyD']) {
        playerX += playerSpeed;
    }
}

function drawStar(x, y) {
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

function drawHeart(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -30);
    for (var i = 0; i < 360; i++) {
        var t = i * Math.PI / 180;
        var px = 16 * Math.pow(Math.sin(t), 3);
        var py = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        ctx.lineTo(px, py);
    }
    ctx.fillStyle = 'rgb(192, 0, 0)';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawShield(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle)
    ctx.beginPath();
    ctx.moveTo(0, -30);
    for (var i = 0; i < 360; i++) {
        var t = i * Math.PI / 180;
        var px = (16 + shieldRadius) * Math.pow(Math.sin(t), 3);
        var py = -((13 + shieldRadius) * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        ctx.lineTo(px, py);
    }
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawHud() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('hp: ' + heart, 20, 40);
}

function update() {
    clearCanvas();
    ctx.save();
    movePlayer();
    var offsetX = canvas.width / 2 - playerX;
    var offsetY = canvas.height / 2 - playerY;
    ctx.translate(offsetX, offsetY);
    drawHeart(playerX, playerY, playerAngle);
    if (shieldActive) {
        drawShield(playerX, playerY, playerAngle);
        shieldRadius += shieldGrowthRate;
    }
    drawStar(starX, starY);
    drawMonsters();
    ctx.restore();
    drawHud();
    CollisionStar();
}

function autoRotate() {
    if (!gameEnd) {
        playerAngle += rotationSpeed;
        update();
        animationId = requestAnimationFrame(autoRotate);
    }
}

var startButton = document.getElementById('btn');
startButton.addEventListener('click', function() {
    startGame();
});

function drawRandomStar() {
    starX = Math.random() * canvas.width;
    starY = Math.random() * canvas.height;
    update();
}

function createMonster() {
    var angle = Math.atan2(playerY - canvas.height / 2, playerX - canvas.width / 2);
    var startX = Math.random() < 0.5 ? -100 : canvas.width + 100;
    var startY = Math.random() * canvas.height;
    var speed = Math.random() * 3 + 0.5;
    var monster = {
        x: startX,
        y: startY,
        radius: Math.random() * 10 + 5,
        color: getRandomColor(),
        speed: speed,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        lifeTime: 3000 
    };
    monsters.push(monster);
}

function drawMonsters() {
    for (var i = 0; i < monsters.length; i++) {
        var monster = monsters[i];
        var angle = Math.atan2(playerY - monster.y, playerX - monster.x);
        monster.speedX = Math.cos(angle) * monster.speed;
        monster.speedY = Math.sin(angle) * monster.speed;
        monster.x += monster.speedX;
        monster.y += monster.speedY;
        drawCircle(monster.x, monster.y, monster.radius, monster.color);
        if (Colliding(monster)) {
            if (shieldActive) {
                monsters.splice(i, 1);
                i--;
            } else {
                monsters.splice(i, 1);
                i--;
                heart--;
                if (heart <= 0) {
                    endGame();
                }
            }
        } else if (monster.lifeTime <= 0) {
            monsters.splice(i, 1);
            i--;
        } else {
            monster.lifeTime -= 16.67; 
        }
    }
}

function Colliding(monster) {
    var dx = playerX - monster.x;
    var dy = playerY - monster.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance < monster.radius + 30 + (shieldActive ? shieldRadius : 0);
}

function CollisionStar() {
    var dx = playerX - starX;
    var dy = playerY - starY;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var playerRadius = 30;
    var starRadius = 40;

    if (distance < playerRadius + starRadius) {
        shieldActive = true;
        shieldRadius = 0;
        setTimeout(function() {
            shieldActive = false;
        }, shieldTime);
        drawRandomStar();
    }
}

function getRandomColor() {
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

function endGame() {
    clearCanvas();
    gameEnd = true;
    cancelAnimationFrame(animationId);
    clearInterval(intervalId);
    startButton.style.display = 'block';
    document.getElementById('canvastext').getElementsByTagName('p')[0].textContent = "힘듭니다.";
    document.getElementById('canvastext').getElementsByTagName('p')[1].textContent = '뭔지모르겠습니다.';
    document.getElementById('canvastext').classList.remove('hidden');
    document.getElementById('total').style.border = '1px solid rgb(0, 0, 0)';
    document.getElementById('total').style.backgroundColor = 'rgb(255, 0, 0)';
    document.getElementById('canvastext').style.color = 'rgb(255, 255, 255)';
    monsters = [];
}

function startGame() {
    clearCanvas();
    gameEnd = false;
    heart = 3;
    playerX = canvas.width / 2;
    playerY = canvas.height / 2;
    startButton.style.display = 'none';
    document.getElementById('canvastext').classList.add('hidden');
    var monsterCount = Math.floor(Math.random() * 11) + 5;
    for (var i = 0; i < monsterCount; i++) {
        createMonster();
    }
    drawRandomStar();
    autoRotate();
    intervalId = setInterval(function() {
        createMonster();
    }, 500);
    document.getElementById('total').style.border = '1px solid rgb(255, 255, 255)';
    document.getElementById('total').style.backgroundColor = 'rgb(72, 153, 242)';
    document.getElementById('canvastext').style.color = 'white';
    startButton.removeEventListener('click', startGame);
}
