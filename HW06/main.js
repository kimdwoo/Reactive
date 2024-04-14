var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

class HeartObject {
    constructor(radius, positionX, positionY, velocityX, velocityY, rotationSpeed, color) {
        this.color = color;
        this.radius = radius;
        this.positionX = positionX;
        this.positionY = positionY;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.rotationSpeed = rotationSpeed * Math.floor(Math.random() * 100);
    }
    
    draw() {
        ctx.save();
        ctx.beginPath();
    
        ctx.translate(this.positionX, this.positionY);
        ctx.rotate(this.rotationSpeed * Math.PI / 180);
         // 회전 속도에 따라 회전
        
        ctx.moveTo(0, 0); //시작점
        
        // 하트를 그리는 곡선 좌표 계산
        for (var i = 0; i < 360; i++) {
            var t = i * Math.PI / 180;
            var x = 16 * Math.pow(Math.sin(t), 3);
            var y = - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            ctx.lineTo(x, y); // 각도에 해당하는 좌표로 선을 그림
            
        }
    
        ctx.fillStyle = this.color; // 선택한 색상 적용
        ctx.fill();
    
        ctx.closePath();
        ctx.restore();

        this.rotationSpeed++;
      
    }
    
    move() {
        //속도 적용
        this.positionX += this.velocityX * 0.1;
        this.positionY += this.velocityY * 0.1;
        
        // 캔버스 경계에 도달하면 반대 방향으로 튕기도록 설정
        if (this.positionX + this.radius >= canvas.width || this.positionX - this.radius <= 0) {
            this.velocityX = -this.velocityX;
        }
        if (this.positionY + this.radius >= canvas.height || this.positionY - this.radius <= 0) {
            this.velocityY = -this.velocityY;
        }
    }
}

var heart = []; // 하트 객체를 담을 배열

function createRandomHeart(x, y) {
    var radius = Math.random() * 20 + 10; // 반지름은 10에서 30 사이의 무작위 값
    var positionX = x;
    var positionY = y;
    var velocityX = (Math.random() - 0.5) * 5; // X축 속도 무작위 설정 (다양한 속도)
    var velocityY = (Math.random() - 0.5) * 5; // Y축 속도 무작위 설정 (다양한 속도)
    var rotationSpeed = Math.random() * 10; // 회전 속도 무작위 설정 (다양한 회전 속도)
    var color = getRandomColor(); // 무작위 색상 선택
    var newHeart = new HeartObject(radius, positionX, positionY, velocityX, velocityY, rotationSpeed, color);
    heart.push(newHeart); // 배열에 하트 추가
}

function getRandomColor() {
    // 무작위 RGB 값 생성
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 각 하트를 렌더링하고 이동시킴
    heart.forEach(function(heart) {
        heart.draw();
        heart.move();
    });
    
    requestAnimationFrame(render); // 다음 애니메이션 프레임 요청
}

// 마우스 이벤트 리스너 추가
canvas.addEventListener('mousemove', function(event) {
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;
    createRandomHeart(mouseX, mouseY); // 마우스 커서 위치에 하트 생성
});

setInterval(function() {
    createRandomHeart(Math.random() * canvas.width, Math.random() * canvas.height); // 0.2초마다 랜덤 위치에 하트 생성
}, 200);

render();