const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
  x: 50,
  y: 200,
  width: 30,
  height: 30,
  dy: 0,
  gravity: 0.4,
  lift: -12,
  velocity: 0
};

let isJumping = false;

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }
function updatePlayer() {
    player.velocity += player.gravity;
    player.y += player.velocity;
  
    if (player.y > canvas.height - player.height) {
      player.y = canvas.height - player.height;
      player.velocity = 0;
      isJumping = false;
    }
  }
function jump() {
    if (!isJumping) {
      player.velocity += player.lift;
      isJumping = true;
    }
  }
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
      jump();
    }
  });
  function drawHeart(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 2);
    ctx.arc(x - size / 4, y, size / 4, Math.PI, 0, false);
    ctx.arc(x + size / 4, y, size / 4, Math.PI, 0, false);
    ctx.lineTo(x, y + size);
    ctx.closePath();
    ctx.fillStyle = 'red'; // 채우기 색상
    ctx.fill();
  }
  
  // 하트 그리기
  drawHeart(100, 100, 50); // (x, y, 크기)

let obstacles = [];
let obstacleSpeed = 2;

function createObstacle() {
    const minHeight = 20; // 최소 높이
    const maxHeight = 120; // 최대 높이
    const height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
    const width = 20; // 폭은 고정
  
    let obstacle = {
      x: canvas.width,
      y: canvas.height - height, // 캔버스 바닥에서 높이를 빼 장애물의 하단이 항상 바닥에 닿도록 함
      width: width,
      height: height
    };
    obstacles.push(obstacle);
  }

function drawObstacles() {
  obstacles.forEach(obstacle => {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].x -= obstacleSpeed;
  
      // AABB 충돌 검사
      if (player.x < obstacles[i].x + obstacles[i].width &&
          player.x + player.width > obstacles[i].x &&
          player.y < obstacles[i].y + obstacles[i].height &&
          player.y + player.height > obstacles[i].y) {
        // 충돌 감지: 플레이어가 장애물 위에 있는지 확인
        if (player.y + player.height <= obstacles[i].y + 10) {
          // 플레이어가 장애물 위에 안착했음
          player.y = obstacles[i].y - player.height;
          player.velocity = 0;
          isJumping = false;  // 다시 점프할 수 있도록 점프 상태 초기화
        } else {
          // 그 외의 충돌 (옆면이나 아래쪽)
          console.log('Game Over!');
          obstacles = []; // 장애물 리셋
          player.y = 200; // 플레이어 위치 리셋
          break;
        }
      }
  
      // 화면 밖으로 나간 장애물 제거
      if (obstacles[i].x + obstacles[i].width < 0) {
        obstacles.splice(i, 1);
      }
    }
  }
  let items = [];

function createItem() {
  let item = {
    x: canvas.width, // 아이템이 오른쪽 끝에서 시작하도록 함
    y: Math.random() * (canvas.height - 30) + 15, // 아이템이 캔버스 내부에 위치하도록 랜덤 y 좌표 생성
    radius: 10, // 아이템의 반지름
    speed: 2 // 아이템의 이동 속도
  };
  items.push(item);
}
function moveItems() {
    items.forEach(item => {
      item.x -= item.speed; // 아이템을 왼쪽으로 이동
    });
  }

setInterval(createItem, 5000);

setInterval(createItem, 5000); // 5초마다 아이템 생성
  function drawItems() {
    ctx.fillStyle = 'green';
    items.forEach(item => {
      ctx.beginPath();
      ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  function checkItemCollision() {
    for (let i = items.length - 1; i >= 0; i--) {
      const dx = player.x + player.width / 2 - items[i].x;
      const dy = player.y + player.height / 2 - items[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < player.width / 2 + items[i].radius) {
        items.splice(i, 1); // 아이템 제거
      }
    }
  }

setInterval(createObstacle, 2000); // Create an obstacle every 2000 milliseconds

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}



function gameLoop() {
    clearCanvas();
    drawPlayer();
    updatePlayer();
    drawObstacles();
    updateObstacles();
    drawItems();
    moveItems(); // 아이템 이동
    checkItemCollision();
    requestAnimationFrame(gameLoop);
  }
  
  gameLoop();
