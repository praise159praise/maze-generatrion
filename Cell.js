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
