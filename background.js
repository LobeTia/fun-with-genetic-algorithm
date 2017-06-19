function Plant() {
    this.x = random(width)
    this.y = random(height)

    this.display = function () {
        noStroke()
        fill(52, 152, 219)
        triangle(
            relativePoint(0, this.x),
            relativePoint(5, this.y),
            relativePoint(20, this.x),
            relativePoint(5, this.y),
            relativePoint(10, this.x),
            relativePoint(20, this.y)
        )
        triangle(
            relativePoint(0, this.x),
            relativePoint(15, this.y),
            relativePoint(20, this.x),
            relativePoint(15, this.y),
            relativePoint(10, this.x),
            relativePoint(0, this.y)
        )

        fill(241, 196, 15)
        noStroke()
        ellipse(
            relativePoint(10, this.x),
            relativePoint(10, this.y),
            8, 8
        )
    }
}

var entities = []
var counter

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    entities.push(new Plant())
    counter = 0
}
function draw() {
    background(46, 204, 113)
    if (++counter === 120) {
        entities.push(new Plant())
        counter = 0
    }
    entities.map((entity) => entity.display())
}

function relativePoint(origin, delta) {
    return origin + delta
}