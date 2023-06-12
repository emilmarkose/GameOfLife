let world;
let rows;
let cols;
let res = 4

function createWorld(cols, rows) {
    let world = Array(cols)
    for(let i = 0; i < cols; i++) {
        world[i] = new Array(rows)
    }
    return world;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    cols = Math.round(width / res);
    rows = Math.round(height / res);
    world = createWorld(cols, rows)
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            world[i][j] = floor(random(2))
        }
    }
}

function draw() {
    background(0);
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let x = i * res;
            let y = j * res;
            if(world[i][j] == 1) {
                fill(255);
                rect(x, y, res - 1, res - 1);
            }
        }
    }

    let nextWorld = createWorld(cols, rows)
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let state = world[i][j]
            let sum = neighborCount(world, i, j)
            if(state == 0 && sum == 3) {
                nextWorld[i][j] = 1
            } else if(state == 1 && (sum < 2 || sum > 3)) {
                nextWorld[i][j] = 0
            } else {
                nextWorld[i][j] = state
            }
        }
    }
    world = nextWorld;
}

function neighborCount(world, x, y) {
    let sum = 0;
    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols
            let row = (y + j + rows) % rows
            sum += world[col][row]
        }
    }
    sum -= world[x][y]
    return sum
}