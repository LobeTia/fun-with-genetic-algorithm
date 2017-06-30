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
    this.maexLif = 2000
    this.life = 2000
    this.debug = true
    this.rotation = 0

    this.lifePercentual = function () {
        return this.life * 100 / this.maexLif / 100 * 36
    }

    this.display = function () {
        // Debug
        if (this.debug) {
            for (var i = -4; i < 5; i++) {
                var rotation = rotatePoint(this.x, this.y, this.x - 160, this.y + (i * 29), this.rotation)
                line(this.x, this.y, rotation[0], rotation[1])
            }
        }

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
        this.rotation
        if (this.life > 0) this.life--
    }

    this.turnLeft=function () {
        this.rotation += 3
    }
    this.turnRight=function () {
        this.rotation -= 3
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
    entities.push(new Rabbit(width / 2, height / 2))
    entities.push(new Plant())
    counter = 0
}
function draw() {
    background(236, 240, 241)

    if (++counter === 120) {
        entities.push(new Plant())
        counter = 0
    }

    if(keyIsDown(LEFT_ARROW)){
        entities[0].turnLeft()
    }
    if(keyIsDown(RIGHT_ARROW)){
        entities[0].turnRight()
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
function rotatePoint(cx, cy, x, y, angle) {
    var _radians = (Math.PI / 180) * angle
    var _cos = Math.cos(_radians)
    var _sin = Math.sin(_radians)
    var _nx = (_cos * (x - cx)) + (_sin * (y - cy)) + cx
    var _ny = (_cos * (y - cy)) - (_sin * (x - cx)) + cy
    return [_nx, _ny];
}