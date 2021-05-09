var dolphin = [];
var bubbles = [];
var fish = [];
let img;
let img2;

function preload() {
    img = loadImage('assets/pebbles.jpg');
    img2 = loadImage('assets/waves.jpg');
  }
// dolphin setup
function setup() {
    createCanvas(600, 600);

    for (var i=0; i<5; i++) {                        
        var dolphinX = random(width);
        var dolphinY = random(100, 500);
        dolphin[i] = makedolphin(dolphinX, dolphinY);
    }

    for (var i=0; i<5; i++) {                        
        var fishX = random(width);
        var fishY = random(100, 400);
        fish[i] = makefish(fishX, fishY);
    }

//bubble setup
    for (var i=0; i<3; i++) {                      
        var bubblesX = random(width);
        var bubblesY = random(height);
        bubbles[i] = makebubbles(bubblesX, bubblesY);
    }   
}

function draw() {
    angleMode(radians);

    // for sea plant movement
    angle = 10 * (noise(millis() / 2000) - 0.5);
    angle1 = 20 * (noise(millis() / 3000) - 0.5);
    angle2 = 30 * (noise(millis() / 5000) - 0.5);
    angle3 = 10 * (noise(millis() / 7000) - 0.5);
    
    ocean(0, 0, width, height);

    // pebbles
    image(img,0,460, 600,200);

    // waves
    image(img2,0,0, 600,110);

    //bubble manipulation
    showbubbles();
    deletebubbles();
    newbubbles();

    // draw Branch 3
    push();
    translate(360,height + 170,100); 
    drawBranch3(0, 80);
    pop();
  
    // draw yellow sea plant
     push();
     translate(220,height + 50); 
     drawBranch2(0, 50);
     pop();
     noStroke();

    // rock shape
    beginShape();
    fill("#285357");
    curveVertex(240, 550);
    curveVertex(240, 550);
    curveVertex(305, 450);
    curveVertex(400, 416);
    curveVertex(500, 600);
    curveVertex(468, 620);
    curveVertex(263, 620);
    curveVertex(240, 550);
    curveVertex(240, 550);
    endShape();

    // ground shape
    beginShape();
    fill("#368692");
    curveVertex(0, 390);
    curveVertex(0,390);
    curveVertex(119,488);
    curveVertex(346, 604);
    curveVertex(0, height);
    curveVertex(0, height);
    endShape();
    
    // dolphin manipulation
    showdolphin();
    deletedolphin();
    makeNewdolphin();

    // fish manipulation
    showfish();
    deletefish();
    makeNewfish();

    // draw medium sea plant
    push();
    translate(530, height + 30); 
    rotate(radians(300));
    drawBranch(0, 20,90);
    pop();

    // draw small sea plant
    push();
    translate(240, height + 10); 
    rotate(radians(300));
    drawBranch0(0, 10,90);
    pop();

    // draw coral
    push();
    translate(160,height -60,100); 
    rotate(radians(300));
    drawBranch1(0, 10,100);
    pop();

    //left rock shape
    beginShape();
    fill("#4d004d");
    curveVertex(0,600);
    curveVertex(0,600);
    curveVertex(0, 219);
    curveVertex(34,238);
    curveVertex(96, 188);
    curveVertex(109, 201);
    curveVertex(54, 289);
    curveVertex(66, 368);
    curveVertex(90, 501);
    curveVertex(118, 536);
    curveVertex(124, 544);
    curveVertex(136, 560);
    curveVertex(140, 600);
    curveVertex(0,600);
    curveVertex(0,600);
    endShape();

    // right rock shape
    beginShape();
    curveVertex(465,0);
    curveVertex(465,0);
    curveVertex(456,14);
    curveVertex(471, 47);
    curveVertex(451, 79);
    curveVertex(471, 147);
    curveVertex(511, 131);
    curveVertex(542, 176);
    curveVertex(517, 190);
    curveVertex(581, 318);
    curveVertex(549, 411);
    curveVertex(570, 620);
    curveVertex(619, 620);
    curveVertex(603, -9);
    curveVertex(465,0);
    curveVertex(465,0);
    endShape();

    // title background
    fill("#8443FE");
    ellipse(100,50,200,100);
    
    // title and signature
    textFont('Georgia');
    textSize(24);
    fill(255);
    text('The Oceans Alive',12,45);
    textSize(16);
    text('by Michelle Casey',40,70);
    
}

// medium plant branches
function drawBranch(depth, len, color) {
    fill("#a9d0d6");
	ellipse(70, 70,-len/3, -len/3);
    push();
    translate(0, -len);
    drawplant(depth +1, len, color);
    pop();
}

// small plant branches
function drawBranch0(depth, len, color) {
    fill("#214145");
	ellipse(40, 40,-len/3, -len/3);
    push();
    translate(0, -len);
    drawplant0(depth +1, len, color);
    pop();
}

// coral plant
function drawBranch1(depth, len, color) {
    stroke(0, 81, color % 255, 60);
	fill("#ff6666");
    ellipse(0, 50,-len , -len);
    ellipse(50, 50,-len , -len * 2);
    ellipse(20, 20,-len , -len * 3);
    push();
    translate(0, -len);
    drawplant1(depth + 1, len, color);
    pop();
}

// large sea plant
function drawBranch2(depth, len) {
    stroke(76,90,39, 60);
    fill(207,243,90,50);
    ellipse(50, 0,-len/5, -len)
    push();
    translate(0, -len);
    drawplant2(depth + 1, len);
    pop();
}

// large mesh sea weed 
function drawBranch3(depth, len, color) {
    stroke(13, 93, 109, 80);
    fill(13, 93, 109, 80);
    ellipse(100, 100,-len/12, -len/12)
    line(30, 0, 30, -len);
    push();
    translate(0, -len);
    drawplant3(depth + 1, len, color);
    pop();
}

// draw sea plants
function drawplant(depth, len, color) {
    if (depth < 8) {
        rotate(radians(-10 + angle));
        drawBranch(depth, len, color  + 50);
        rotate(radians(20));
        drawBranch(depth, len, color + 50);
    }
}
function drawplant0(depth, len, color) {
    if (depth < 8) {
        rotate(radians(-10 + angle));
        drawBranch0(depth, len, color  + 50);
        rotate(radians(20));
        drawBranch0(depth, len, color + 50);
    }
}

function drawplant1(depth, len, color) {
    if (depth < 8) {
        rotate(radians(-10 + angle1));
        drawBranch1(depth, len, color  + 50);
        rotate(radians(20));
        drawBranch1(depth, len, color + 50);
    }
}

function drawplant2(depth, len) {
    if (depth < 8) {
        rotate(radians(-10 + angle2));
        drawBranch2(depth, len);
        rotate(radians(20));
        drawBranch2(depth, len);
    }
}

function drawplant3(depth, len) {
    if (depth < 8) {
        rotate(radians(-10 + angle3));
        drawBranch3(depth, len);
        rotate(radians(20));
        drawBranch3(depth, len);
    }
}

//Draws the gradient ocean
function ocean(x, y, w, h) {
    var c1, c2;
    c1 = color("#03FCCA");
    c2 = color("#8443FE");
 
    for (var i = y; i <= y + h; i++) {
        var inter = map(i, y, y + h, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
    }
}
//dolphin moves left
function showdolphin() {                                      
    for(var i=0; i<dolphin.length; i++) {
        dolphin[i].swim();
        dolphin[i].display();
    }
}
//delete dolphins
function deletedolphin() {                                    
    var dolphinstay = [];
    for (var i=0; i< dolphin.length; i++) {
        if(dolphin[i].x <0) {
            dolphinstay.push(dolphin[i]);
        }
    }
}
//multiple dolphins from left
function makeNewdolphin() {                                   
    var newdolphinyes =0.05;
    if (random(0,1) < newdolphinyes) {
        dolphin.push(makedolphin(650, random(100, 500)));
    }
}
function dolphinswim() {
    this.x += this.speed;
}
// draw dolphin
function dolphinDisplay() {                       
    push();
    translate(this.x, this.y);

    // dolphin tail
    fill("gray");
    triangle(90,26,100,20,110,38);
    
    // dolphin body
    beginShape();
    curveVertex(30,20);
    curveVertex(30,20);
    curveVertex(46,19);
    curveVertex(100,26);
    curveVertex(50,6);
    curveVertex(30,20);
    curveVertex(30,20);
    endShape();
   
    // dolphin eyes
    stroke(0);
    ellipse(38,15,3,3);  
    fill("#00ccff");
    ellipse(38,15,2,1);         
    pop();
}

function makedolphin(birthx, birthy) {
    var dolphin = {x : birthx,
                y : birthy,
                speed : -random(2, 4),
                swim : dolphinswim,
                display : dolphinDisplay}
    return dolphin;
}

//make bubbles move up
function showbubbles() {                                      
    for(var i=0; i<bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].display();
    }
}
//delete bubbles
function deletebubbles() {                                    
    var bubblesToKeep = [];
    for (var i=0; i< bubbles.length; i++) {
        if(bubbles[i].y >600) {
            bubblesToKeep.push(bubbles[i]);
        }
    }
}
//create more bubbles
function newbubbles() {                                   
    var newbubblesyes = 0.5;
    if (random(0,1) < newbubblesyes) {
        bubbles.push(makebubbles(random(width), 600));
    }
}
//move bubbles
function bubblesMove() {                                      
    this.y += this.speed;
}
// display bubbles
function bubblesDisplay() {
    push();
    translate(this.x, this.y);
    fill(255,50);
    ellipse(0, 0, 10, 10);
    pop();


}
// make bubbles
function makebubbles(birthx, birthy) {
    var bubbles = {x : birthx,
                   y : birthy,
                   speed : -random(1, 6),
                   move : bubblesMove,
                   display : bubblesDisplay}
    return bubbles;
}

//fish moves left
function showfish() {                                      
    for(var i=0; i<fish.length; i++) {
        fish[i].swim();
        fish[i].display();
    }
}
//delete fish
function deletefish() {                                    
    var fishstay = [];
    for (var i=0; i< fish.length; i++) {
        if(fish[i].x <0) {
            fishstay.push(fish[i]);
        }
    }
}
//multiple fish from left
function makeNewfish() {                                   
    var newfishyes =0.1;
    if (random(0,1) < newfishyes) {
        fish.push(makefish(650, random(100, 500)));
    }
}
function fishswim() {
    this.x += this.speed;
}
// draw fish
function fishDisplay() {                       
    push();
    translate(this.x, this.y);

    //fish tail
    fill("#ffff33");
    triangle(40,13,50,10,55,20);
    
  
    // fish fins
    beginShape();
    fill(0);
    curveVertex(20,10);
    curveVertex(20,10);
    curveVertex(20,6);
    curveVertex(24,5);
    curveVertex(28,5);
    curveVertex(27, 7);
    curveVertex(29, 6);
    curveVertex(30, 9);
    curveVertex(32, 7);
    curveVertex(32, 11);
    curveVertex(20,10);
    curveVertex(20,10);
    endShape();
    
    // fish body
    beginShape();
    fill("#ffff33");
    curveVertex(15,12);
    curveVertex(15,12);
    curveVertex(23,8);
    curveVertex(42,13);
    curveVertex(22,18);
    curveVertex(15,12);
    curveVertex(15,12);
    endShape();
    
    // fish eyes
    stroke(0); 
    fill("#00ccff");
    ellipse(20,12,2,2); 
    //fish stripes
    stroke("#ff6666");
    fill("#ff6666");
    ellipse(30,16,22,4); 
    
    stroke("#0066ff");
    fill("#0066ff");
    ellipse(30,15,20,1);   
    pop();
}

function makefish(fbirthx, fbirthy) {
    var fish = {x : fbirthx,
                y : fbirthy,
                speed : -random(2, 4),
                swim : fishswim,
                display : fishDisplay}
    return fish;
}
