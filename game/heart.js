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