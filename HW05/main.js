    var canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");
    
    var x = canvas.width / 2; // x는 캔버스 widht의 중심
    var y = canvas.height / 2;// y는 캔버스 height의 중심

    // 태양 중심까지 거리
    var sunmid = 200;

    //지구 중심까지 거리
    var earthmid = 50;


    var sun = 0; //태양 자전 각도
    var earth = 0;//지구 자전 각도
    var earthrect = 0; //지구 공전 각도
    var moon = 0;// 달 자전 각도
    var moonrect = 0;// 달 공전 각도

    var sunrotate = Math.PI / 100; //태양 자전 속도
    var earthrotate = Math.PI / 150; // 지구 자전 속도
    var earthorbit = Math.PI/ 200; //지구 공전 속도
    var moonrotate = Math.PI / 80; // 달 자전 속도
    var moonorbit = Math.PI / 100;// 달 공전 속도
    

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var earthcenterx = x + Math.cos(earthrect) * sunmid;
        // 지구 중심을 캔버스의 widht값 중심의 좌표에 earthrect각도와 sunmid(200)의 거리를 기반으로 계산
        var earthcentery = y - Math.sin(earthrect) * sunmid;
        // 지구 중심을 캔버스의 height값 중심의 좌표에 earthrect각도와 sunmid(200)의 거리를 기반으로 계산
        var mooncenterx = earthcenterx + Math.cos(moonrect) * earthmid;
        //달 중심을 지구 중심의x값 좌표에 moonrect각도와 earthmid(50)의 거리를 기반으로 계산 
        var mooncentery = earthcentery + Math.sin(moonrect) * earthmid;
         //달 중심을 지구 중심의y값 좌표에 moonrect각도와 earthmid(50)의 거리를 기반으로 계산


        
        ctx.save();
        ctx.fillStyle = "Red";
        ctx.translate(x,y);
        ctx.rotate(sun);
        ctx.fillRect(-25, -25, 50, 50);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "blue";
        ctx.translate(earthcenterx,earthcentery);
        ctx.rotate(earth); 
        ctx.fillRect(-15, -15, 30, 30);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "gray";
        ctx.translate(mooncenterx,mooncentery);
        ctx.rotate(moon);
        ctx.fillRect(-5, -5, 10, 10); 
        ctx.restore();

        
        sun += sunrotate;
        earth += earthrotate;
        earthrect +=earthorbit;
        moon += moonrotate;
        moonrect +=moonorbit;
        //각 천제의 회전 및 공전의 속도를 저장하는 함수

        requestAnimationFrame(draw);
    }
    draw();