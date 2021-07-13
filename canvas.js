window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas");
  const c = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var up = false, down = false;

  var mouse = {x : 0, y : 0, pressed : false};

  var award = false;

  function scroll(event) {
    if (event.deltaY > 0) {
      down = true;
      up = false;
      if (award && awardn < 3) {
        awardn ++;
      }
    }
    else {
      up = true;
      down = false;
      if (award && awardn > 0) {
        awardn --;
      }
    }
  }

  document.querySelector('canvas').onwheel = scroll;

  canvas.addEventListener("mousedown", function (evt) {
    mouse.pressed = true;
  });

  canvas.addEventListener("mousemove", function (evt) {
      mouse = MousePos(canvas, evt);
  }, false);

  function MousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
      };
  }

  class text {
    constructor(text, speed, size, start, end, pos = Object.assign({}, start)) {
      this.text = text;
      this.size = size;
      this.start = start;
      this.end = end;
      this.pos = pos;
      this.speed = speed;
    }

    update(d) {
      if (d == 1) {
        c.font = this.size.toString() + "px Arial"
        this.pos.x = lerp(this.pos.x, this.end.x, this.speed);
        this.pos.y = lerp(this.pos.y, this.end.y, this.speed);
        c.fillText(this.text, this.pos.x, this.pos.y);
      }
      else if (d == 2) {
        c.font = this.size.toString() + "px Arial"
        this.pos.x = lerp(this.pos.x, this.start.x, this.speed);
        this.pos.y = lerp(this.pos.y, this.start.y, this.speed);
        c.fillText(this.text, this.pos.x, this.pos.y);
      }
      else if (d == 3) {
        c.font = this.size.toString() + "px Arial"
        this.pos.y = lerp(this.pos.y, -1000, 0.01);
        c.fillText(this.text, this.pos.x, this.pos.y);
      }
    }
  }

  class link {
    constructor(text, size, link, pos) {
      this.text = text;
      this.size = size;
      this.link = link;
      this.pos = pos;
    }
    update() {
      c.fillStyle = "white";
      c.font = this.size.toString() + "px Arial"
      if (mouse.x > this.pos.x && mouse.x < this.pos.x + c.measureText(this.text).width) {
        if (mouse.y > this.pos.y - this.size && mouse.y < this.pos.y) {
          c.fillStyle = "grey";
          if (mouse.pressed) {
            if (typeof(this.link) == "string") {
              window.open(this.link, "_self")
            }
            else if (this.link == 1) {
              down = 3;
              award = true;
            }
          }
        }
      }
      c.fillText(this.text, this.pos.x, this.pos.y);
    }
  }

  var texts = [], links = [];

  texts.push(new text("ROBIN",0.015,80,{x:-500,y:250},{x:120,y:250}));
  texts.push(new text("CHANG",0.018,80,{x:-500,y:320},{x:140,y:320}));
  texts.push(new text("____",0.01,80,{x:-1000,y:360},{x:120,y:360}));
  texts.push(new text("  ___",0.015,80,{x:-1000,y:380},{x:120,y:380}));
  texts.push(new text("About me",0.012,60,{x:120,y:250},{x:120,y:-200},{x:120,y:-200}));
  texts.push(new text("I developed my passion and interest in IT when I first joined the robotics",0.011,30,{x:120,y:350},{x:-2000,y:350},{x:-2000,y:350}));
  texts.push(new text("CCA in primary school where I learnt to program robots to do tasks. Since ",0.01,30,{x:120,y:450},{x:-2000,y:400},{x:-2000,y:400}));
  texts.push(new text("then, I have learnt more on programming using Python, Javascript, C++ and",0.009,30,{x:120,y:550},{x:-2000,y:450},{x:-2000,y:450}));
  texts.push(new text("HTML which I used to make my projects.",0.008,30,{x:120,y:650},{x:-2000,y:500},{x:-2000,y:500}));
  links.push(new link("HOME", 20, "https://robieuu.github.io/portfolio/", {x : innerWidth / 3 - 50, y : 80}));
  links.push(new link("AWARDS", 20, 1, {x : innerWidth / 3 * 1.5 - 50, y : 80}));
  links.push(new link("PROJECTS", 20, "https://robieuu.github.io/projects/", {x : innerWidth / 3 * 2 - 50, y : 80}));

  var awardn = 0, awards = [];
  var a1 = new Image();
  var a2 = new Image();
  var a3 = new Image();
  var a4 = new Image();
  var a5 = new Image();
  var a6 = new Image();
  var a7 = new Image();
  var a8 = new Image();
  var a9 = new Image();
  a1.src = "images/award1.png";
  a2.src = "images/award2.png";
  a3.src = "images/award3.png";
  a4.src = "images/award4.png";
  a5.src = "images/award5.png";
  a6.src = "images/award6.png";
  a7.src = "images/award7.png";
  a8.src = "images/award8.png";
  a9.src = "images/award9.png";
  awards.push([a1, window.innerWidth / 3 - 300, 0, 0]);
  awards.push([a2, window.innerWidth / 3 * 2 - 212, 0, 0]);
  awards.push([a3, window.innerWidth / 4 - 210, 0, 1]);
  awards.push([a4, window.innerWidth / 4 * 2 - 180, 0, 1]);
  awards.push([a5, window.innerWidth / 4 * 3 - 150, 0, 1]);
  awards.push([a6, window.innerWidth / 3 - 180, 0, 2]);
  awards.push([a7, window.innerWidth / 3 * 2 - 180, 0, 2]);
  awards.push([a8, window.innerWidth / 3 - 180, 0, 3]);
  awards.push([a9, window.innerWidth / 3 * 2 - 180, 0, 3]);

  var clouds = [];
  var cloud1 = new Image();
  var cloud2 = new Image();
  var cloud3 = new Image();
  var cloud4 = new Image();
  var cloud5 = new Image();
  cloud1.src = "images/cloud1.png";
  cloud2.src = "images/cloud2.png";
  cloud3.src = "images/cloud3.png";
  cloud4.src = "images/cloud4.png";
  cloud5.src = "images/cloud5.png";
  clouds.push([cloud5, -((Math.random() * 200) + 1500), 300, 0.10]);
  clouds.push([cloud4, -((Math.random() * 200) + 2200), 400, 0.20]);
  clouds.push([cloud3, -((Math.random() * 200) + 1800), 500, 0.30]);
  clouds.push([cloud2, -((Math.random() * 200) + 2000), 600, 0.50]);
  clouds.push([cloud1, -((Math.random() * 200) + 1000), 700, 0.70]);
  main();

  function main() {

    c.canvas.width = window.innerWidth;
    c.canvas.height = window.innerHeight;

    requestAnimationFrame(main);
    var grd = c.createLinearGradient(0, -1000, 0, window.innerHeight);
    grd.addColorStop(0, "#185ADB");
    grd.addColorStop(1, "#1A1A2E");
    c.fillStyle = grd;
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);
    c.fillStyle = "white";

    links[0].pos.x = window.innerWidth / 3 - 50;
    links[1].pos.x = window.innerWidth / 3 * 1.5 - 55;
    links[2].pos.x = window.innerWidth / 3 * 2 - 50;


    awards[0][1] = window.innerWidth / 3 - 300;
    awards[1][1] = window.innerWidth / 3 * 2 - 212;
    awards[2][1] = window.innerWidth / 4 - 210;
    awards[3][1] = window.innerWidth / 4 * 2 - 180;
    awards[4][1] = window.innerWidth / 4 * 3 - 150;
    awards[5][1] = window.innerWidth / 3 - 180;
    awards[6][1] = window.innerWidth / 3 * 2 - 180;
    awards[7][1] = window.innerWidth / 3 - 180;
    awards[8][1] = window.innerWidth / 3 * 2 - 180;
    
    for (var i = 4; i < texts.length; i ++) {
      texts[i].start.x = (window.innerWidth - 1070) / 2;
      if (i == 4)texts[i].end.x = (window.innerWidth - 1070) / 2;
    }

    for (var i = 0; i < clouds.length; i ++) {
      clouds[i][2] = window.innerHeight - (700 - i * 100);
      c.drawImage(clouds[i][0], clouds[i][1] - (mouse.x + innerWidth / 2) / innerWidth * 100 * clouds[i][3], clouds[i][2] - (mouse.y + innerHeight / 2) / innerHeight * 100 * clouds[i][3]);
    }

    for (var i = 0; i < texts.length; i ++) {
      if (down == 3 || award) {
        texts[i].update(3);
        for (var i = 0; i < awards.length; i ++) {
          var a = awards[i]
          a[2] = lerp(a[2], + a[3] * 1000 + 280 - awardn * 1000, 0.02)
          c.drawImage(a[0], a[1], a[2])
        }

      }
      else if (down) {
        texts[i].update(2);
      }
      else if (!down){
        texts[i].update(1);
      }
    }
    for (var i = 0; i < links.length; i ++) {
      links[i].update();
    }
    mouse.pressed = false;
    c.fillStyle = "black";
    c.fillText("⭥ Scroll ⭥", window.innerWidth / 2 - 50, window.innerHeight - 100);
  }

  function lerp(a, b, f) {
    return (a * (1 - f)) + (b * f);
  }
})
