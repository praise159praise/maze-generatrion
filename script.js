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