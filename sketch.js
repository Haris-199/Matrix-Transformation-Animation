// TODO
// User input matrix
// Solve system of equations
// Add multiple tranformations
let A, Start;
let E = [];
let eigVecs = [], AEigVecs = [];
let origin;
let col1Ang, col2Ang, col1Mag, col2Mag, lerpedCol1Mag, lerpedCol2Mag;
let lerpedCol1Ang, lerpedCol2Ang;
let sep = 25;
let t = 0;
let play = false;
let showEigVecs = true;

function setup() {
    let cnv = createCanvas(400, 400);
    // cnv.center("horizontal");

    let rotate = radians(145);

    A = new Matrix(3, 1, 2, 3);
    // A = new Matrix(-3, 1, 2, 3);
    // A = new Matrix(3, 0, 2, 3);  
    // A = new Matrix(1, 1, 0, 1);  
    // A = new Matrix(2, 2, 1, 3);
    // A = new Matrix(7, 3, 3, -1); // PatrickJMT
    // A = new Matrix(1, 2, 1, 2.01);
    // A = new Matrix(1, 2, 2, 4);
    // A = new Matrix(cos(rotate), -sin(rotate), sin(rotate), cos(rotate));
    I = new Matrix(1, 0, 0, 1);
    Start = new Matrix(1, 0, 0, 1);
    // Start = new Matrix(3, 1, 2, 3);

    origin = createVector();

    col1Ang = A.col1.heading();
    col2Ang = I.col2.angleBetween(A.col2);
    col1Mag = A.col1.mag();
    col2Mag = A.col2.mag();

    // document.getElementById("mtop").innerHTML = `[${A.a.toFixed(4)}\t${A.b.toFixed(4)}]`;
    // document.getElementById("mbot").innerHTML = `[${A.c.toFixed(4)}\t${A.d.toFixed(4)}]`;
    document.getElementById("determinant").innerHTML = `Determinant: ${A.det.toFixed(4)}`;

    let eigVals = A.eigenValues();
    if (eigVals.length < 1) document.getElementById("eigvals").innerHTML = `No Eigen Values`;
    if (eigVals.length == 1) document.getElementById("eigvals").innerHTML = `Eigen Value: ${eigVals[0].toFixed(4)}`;
    if (eigVals.length == 2) document.getElementById("eigvals").innerHTML = `Eigen Values: ${eigVals[0].toFixed(4)}, ${eigVals[1].toFixed(4)}`;

    for (let i = 0; i < eigVals.length; i++) {
        E.push(new Matrix(A.a - eigVals[i], A.b, A.c, A.d - eigVals[i]));
        eigVecs.push(createVector(-E[i].row1.y / E[i].row1.x, 1));
        AEigVecs.push(A.mult(eigVecs[i]));
    }
}

function draw() {
    background(50);

    grid();
    translate(height / 2, width / 2);
    scale(1, -1);

    drawArrow(origin, p5.Vector.mult(A.col1, sep), "rgba(0, 0, 150, 10)");
    drawArrow(origin, p5.Vector.mult(A.col2, sep), "rgba(150, 0, 0, 10)");

    // Transformation
    lerpedCol1Ang = lerp(Start.col1.heading(), col1Ang, f(t));
    lerpedCol1Mag = lerp(Start.col1.mag(), col1Mag, f(t));
    let transIhat = p5.Vector.fromAngle(lerpedCol1Ang, lerpedCol1Mag);

    // console.log(degrees(lerpedCol2Ang))
    lerpedCol2Ang = lerp(I.col2.angleBetween(Start.col2), col2Ang, f(t));
    lerpedCol2Mag = lerp(Start.col2.mag(), col2Mag, f(t));
    let transJhat = p5.Vector.fromAngle(lerpedCol2Ang + PI / 2, lerpedCol2Mag);

    // stroke(0, 120, 100);
    stroke(125);
    for (let s = -20; s < 100; s++) {
        let v1 = p5.Vector.mult(transIhat, s * sep);
        let v2 = p5.Vector.mult(transJhat, sep * sep);
        // Vertical lines
        line(v1.x + v2.x, v1.y + v2.y, v1.x - v2.x, v1.y - v2.y);

        v1 = p5.Vector.mult(transJhat, s * sep);
        v2 = p5.Vector.mult(transIhat, sep * sep);
        // Horizontal lines
        line(v1.x + v2.x, v1.y + v2.y, v1.x - v2.x, v1.y - v2.y);
    }

    if (showEigVecs) {
        let transEigVecs = [];
        for (let i = 0; i < eigVecs.length; i++) {
            drawArrow(origin, p5.Vector.mult(eigVecs[i], sep), "rgba(255, 230, 0, 10)");
            let eigVecAng = eigVecs[i].heading();//lerp(I.col1.angleBetween(eigVecs[i]), I.col1.angleBetween(AEigVecs[i]), f(t));
            let lerpedEigVecMag = lerp(eigVecs[i].mag(), AEigVecs[i].mag(), f(t));
            transEigVecs.push(p5.Vector.fromAngle(eigVecAng, lerpedEigVecMag));
            drawArrow(origin, p5.Vector.mult(transEigVecs[i], sep), "rgb(255, 230, 0)");
        }
    }

    drawArrow(origin, p5.Vector.mult(transIhat, sep), "blue");
    drawArrow(origin, p5.Vector.mult(transJhat, sep), "red");

    // if (t >= 1) noLoop();
    if (t >= 1) t -= 0.01;
    if (play) t += 0.01;
}

function drawArrow(base, vec, myColor) {
    // from https://p5js.org/reference/#/p5.Vector/angleBetween
    push();
    stroke(myColor);
    strokeWeight(1);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 3;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

function grid() {
    // Grid
    for (let i = 0; i < height; i += sep) {
        stroke(25);
        if (i == height / 2) stroke(0);
        line(0, i, width, i);
    }
    for (let i = 0; i < width; i += sep) {
        stroke(25);
        if (i == width / 2) stroke(0);
        line(i, 0, i, height);
    }
    drawArrow(createVector(width / 2, height / 2), createVector(sep, 0), "rgba(0, 0, 100, 10)");
    drawArrow(createVector(width / 2, height / 2), createVector(0, -sep), "rgba(100, 0, 0, 10)");
}

function f(t) {
    // Smoothstep from
    // https://www.youtube.com/watch?v=YJB1QnEmlTs&ab_channel=SimonDev
    // let v1 = t * t * t;
    // let v2 = 1 - (1 - t) * (1 - t) * (1 - t);
    // return lerp(v1, v2, t);

    // from https://en.wikipedia.org/wiki/Smoothstep
    return 3 * t * t - 2 * t * t * t;
}