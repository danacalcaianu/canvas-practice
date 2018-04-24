const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

function getRandomColor() {
    var r = Math.floor(Math.random() * 256)
    var g = Math.floor(Math.random() * 256)
    var b = Math.floor(Math.random() * 256)
    var rgb = `rgba(${r}, ${g}, ${b})`;
    return rgb;
}

function Circle(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill()
        c.stroke()
    }

    this.update = function () {
        if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
            this.color = getRandomColor()
            c.fillStyle = this.color
            c.fill()
            this.dx = -this.dx
        }
        if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
            this.color = getRandomColor()
            c.fillStyle = this.color
            c.fill()
            this.dy = -this.dy
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}



var circleArray = []

for (i = 0; i < 10; i++) {
    var radius = Math.random() * 60;
    let x = Math.random() * (window.innerWidth - radius * 2) + radius
    let y = Math.random() * (window.innerHeight - radius * 2) + radius
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3
    let color = getRandomColor()
    circleArray.push(new Circle(x, y, radius, dx, dy, color));
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
}

animate()