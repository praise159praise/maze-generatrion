var cols, rows
var w = 12.5
var cells = []
let current
let stack = []

function setup() {
    createCanvas(500, 500)
    cols = floor(width / w)
    rows = floor(height / w)
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let cell = new Cell(i, j)
            cells.push(cell)
        }
    }

    current = cells[0]
}
function draw() {
    background(51)
    for (let i = 0; i < cells.length; i++) {
        cells[i].show()
    }
    current.visited = true
    let next = current.checkNeighbors()
    if (next) {
        stack.push(current)
        removeWall(current, next)
        current = next
    } else if (stack.length > 0) current = stack.pop()
    current.highlight()
}
const index = (i, j) => i < 0 || j < 0 || i > rows - 1 || j > rows - 1 ? -1 : i + j * cols

function Cell(i, j) {
    this.i = i
    this.j = j
    this.visited = false
    this.walls = [true, true, true, true]
    this.show = () => {
        var x = this.i * w
        var y = this.j * w


        if (this.visited) {
            stroke(255)
            noFill()
            if (this.walls[0]) line(x, y, x + w, y)
            if (this.walls[1]) line(x + w, y, x + w, y + w)
            if (this.walls[2]) line(x + w, y + w, x, y + w)
            if (this.walls[3]) line(x, y + w, x, y)
            noStroke()
            fill(255, 255, 255, 0)
            rect(x, y, w, w)



        }
    }
    this.checkNeighbors = () => {
        let neighbors = []
        let top = cells[index(i, j - 1)]
        let right = cells[index(i + 1, j)]
        let bottom = cells[index(i, j + 1)]
        let left = cells[index(i - 1, j)]
        if (top && !top.visited) neighbors.push(top)
        if (right && !right.visited) neighbors.push(right)
        if (bottom && !bottom.visited) neighbors.push(bottom)
        if (left && !left.visited) neighbors.push(left)

        if (neighbors.length > 0) return neighbors[floor(random(neighbors.length))]

        return undefined
    }
    this.highlight = () => {
        var x = this.i * w
        var y = this.j * w
        noStroke()
        fill(0, 0, 0)
        rect(x, y, w, w)
    }

}

const removeWall = (curr, next) => {
    let x = curr.i - next.i

    if (x === 1) {
        curr.walls[3] = false
        next.walls[1] = false


    } else if (x === -1) {
        curr.walls[1] = false
        next.walls[3] = false
    }
    let y = curr.j - next.j
    if (y === 1) {
        curr.walls[0] = false
        next.walls[2] = false
    } else if (y === -1) {
        curr.walls[2] = false
        next.walls[0] = false
    }
}