function Plant(x = random(width), y = random(height)) {
    this.x = x
    this.y = y
    this.rotation = HALF_PI

    this.display = function () {
        push()
        image(images.carrot, this.x - 12, this.y - 12, 24, 24);
        pop()
    }
    this.update = function () {
    }
}

function Rabbit(x = random(width), y = random(height)) {
    this.x = x
    this.y = y
    this.life = 1000

    this.lifePercentual = function () {
        return this.life * 100 / 1000 / 100 * 36
    }

    this.display = function () {
        // Draw rabbit
        image(images.rabbit, this.x - 18, this.y - 18, 36, 36);

        // Draw life
        if (this.life > 0) {
            fill(255, 255, 255)
            rect(rP(-18, this.x), rP(-27, this.y), 36, 5)
            fill(0, 255, 0)
            rect(rP(-18, this.x), rP(-27, this.y), this.lifePercentual(), 5)
        } else {
            fill(255, 0, 0)
            rect(rP(-18, this.x), rP(-27, this.y), 36, 5)
        }
    }
    this.update = function () {
        if (this.life > 0) this.life--
    }
}

var entities = []
var counter
var canvas
var images = {}

function preload() {
    images.rabbit = loadImage("images/rabbit.png");
    images.carrot = loadImage("images/carrot.png");
}
function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight)
    entities.push(new Plant())
    entities.push(new Rabbit(width / 2, height / 2))
    counter = 0
}
function draw() {
    background(236, 240, 241)

    if (++counter === 120) {
        entities.push(new Plant())
        counter = 0
    }

    entities.map((entity) => entity.update())
    entities.map((entity) => entity.display())

    var textPlaceholder = `Fun with Genetic Algorithm
Entities: ${entities.length}`

    fill(0, 0, 0);
    textSize(15)
    textFont("monospace")
    text(textPlaceholder, 5, 20, 300)
}

function rP(origin, delta) {
    return origin + delta
}