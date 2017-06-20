function Plant(x = random(width), y = random(height)) {
    this.x = x
    this.y = y

    this.display = function () {
        noStroke()
        fill(52, 152, 219)
        triangle(rP(0, this.x), rP(5, this.y), rP(20, this.x), rP(5, this.y), rP(10, this.x), rP(20, this.y))
        triangle(rP(0, this.x), rP(15, this.y), rP(20, this.x), rP(15, this.y), rP(10, this.x), rP(0, this.y))

        fill(241, 196, 15)
        ellipse(rP(10, this.x), rP(10, this.y), 8, 8)
    }
    this.update = function () {
    }
}

function Rabbit(x = random(width), y = random(height)) {
    this.x = x
    this.y = y
    this.life = 1000

    this.lifePercentual = function () {
        return this.life * 100 / 1000 / 100 * 40
    }

    this.display = function () {
        // Draw rabbit
        noStroke()
        fill(149, 165, 166)
        rect(rP(0, this.x), rP(0, this.y), 25, 15)
        stroke(color(0, 0, 0, 30))
        rect(rP(-5, this.x), rP(-15, this.y), 3, 15)
        rect(rP(0, this.x), rP(-15, this.y), 3, 15)
        quad(rP(-5, this.x), rP(0, this.y), rP(0, this.x), rP(-8, this.y), rP(5, this.x), rP(0, this.y), rP(0, this.x), rP(8, this.y))

        // Draw life
        if (this.life > 0) {
            fill(255, 255, 255)
            rect(rP(-10, this.x), rP(-24, this.y), 40, 5)
            fill(0, 255, 0)
            rect(rP(-10, this.x), rP(-24, this.y), this.lifePercentual(), 5)
        } else {
            fill(255, 0, 0)
            rect(rP(-10, this.x), rP(-24, this.y), 40, 5)
        }
    }
    this.update = function () {
        if (this.life > 0) this.life--
    }
}

var entities = []
var counter
var canvas
function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight)
    entities.push(new Plant())
    entities.push(new Rabbit(width / 2, height / 2))
    counter = 0
}
function draw() {
    background(46, 204, 113)

    var textPlaceholder = `Fun with Genetic Algorithm
Entities: ${entities.length}`

    fill(0, 0, 0);
    textSize(15)
    textFont("monospace")
    text(textPlaceholder, 5, 20, 300)

    if (++counter === 120) {
        entities.push(new Plant())
        counter = 0
    }

    entities.map((entity) => entity.update())
    entities.map((entity) => entity.display())
}

function rP(origin, delta) {
    return origin + delta
}