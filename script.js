
console.log("JS LOADED ✅");

const totalCards = 20;
const cols = 5;
const rows = 4;

const headerH = 70;

const pad = 30;
const gap = 25;

let cards = [];
let images = [];
let clicks = 0;
let selectedIndex = -1;

function preload() {
    images[0] = loadImage("./images/butterfly.jpeg");
    images[1] = loadImage("./images/cat.jpeg");
    images[2] = loadImage("./images/snoopy.jpeg");
    images[3] = loadImage("./images/space.jpeg");
    images[4] = loadImage("./images/star1.jpeg");
    images[5] = loadImage("./images/star2.jpeg");
    images[6] = loadImage("./images/star3.jpeg");
    images[7] = loadImage("./images/star4.jpeg");
    images[8] = loadImage("./images/sunflower.jpeg");
    images[9] = loadImage("./images/tomato.jpeg");
  }

function setup() {
  createCanvas(windowWidth, windowHeight);

  const gridW = width - pad * 2 - gap * (cols - 1);
  const gridH = (height - headerH) - pad * 2 - gap * (rows - 1);

  const cardSize = min(gridW / cols, gridH / rows);

  cards = [];
  let i = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = pad + c * (cardSize + gap);
      const y = headerH + pad + r * (cardSize + gap);

      cards.push({
        x,
        y,
        size: cardSize,
      });

      i++;
      if (i >= totalCards) break;
    }
    if (i >= totalCards) break;
  }
}

function draw() {
  background("white");
  drawHeader();
  drawGrid();
}

function drawHeader() {
  noStroke();
  fill("gray");
  textSize(22);
  textStyle(BOLD);
  text("Memory Card Game", pad, 32);

  textSize(14);
  textStyle(NORMAL);
  text("Clicks: " + clicks, pad, 55);

  stroke(200);
  line(0, headerH, width, headerH);
}

function drawGrid() {
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    stroke(60);

    if (i === selectedIndex) {
      fill(210);
      strokeWeight(3);
    } else {
      fill(255);
      strokeWeight(1.5);
    }

    rect(card.x, card.y, card.size, card.size, 10);
    image(images[i % 10], card.x, card.y, card.size, card.size);
  }
}

function mousePressed() {
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    const inside =
      mouseX >= card.x &&
      mouseX <= card.x + card.size &&
      mouseY >= card.y &&
      mouseY <= card.y + card.size;

    if (inside) {
      clicks++;
      selectedIndex = i;
      break;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
