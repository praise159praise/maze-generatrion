var cols, rows
var w = 25
var cells = []

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


}
function draw() {
    background(51)
    for (let i = 0; i < cells.length; i++) {
        cells[i].show()
    }
}

function Cell(i, j) {
    this.i = i
    this.j = j
    this.walls = [1,1,1,1]
    this.show = () => {
        var x = this.i * w
        var y = this.j * w
        stroke(255)
        noFill()
        if (this.walls[0]) line(x, y, x + w, y)
        if (this.walls[1]) line(x + w, y, x + w, y + w)
        if (this.walls[2]) line(x + w, y + w, x, y + w)
        if (this.walls[3]) line(x, y + w, x, y)


    }

}