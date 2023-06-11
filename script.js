// document.getElementById("mtop").innerHTML = `[${A.a.toFixed(4)}\t${A.b.toFixed(4)}]`;
// document.getElementById("mbot").innerHTML = `[${A.c.toFixed(4)}\t${A.d.toFixed(4)}]`;
// document.getElementById("determinant").innerHTML = `Determinant: ${A.det.toFixed(4)}`;

// document.body.onload = displayMatrix;
window.onload = displayMatrix;

function displayMatrix() {
    let table = document.createElement("table");
    
    
    let mdiv = document.getElementById("matrix");
    mdiv.appendChild(table);
    let row1 = table.insertRow(0);
    let c11 = row1.insertCell(0);
    let c12 = row1.insertCell(1);
    c11.innerHTML = A.a;
    c12.innerHTML = A.b;
    
    
    let row2 = table.insertRow(1);
    let c21 = row2.insertCell(0);
    let c22 = row2.insertCell(1);
    c21.innerHTML = A.c;
    c22.innerHTML = A.d;
    
}

function start_stop() {
    // document.getElementById("mtop").style.backgroundColor = "red";
    if (!play) {
        document.getElementById("play").innerHTML = "Pause";
        play = true;
    }
    
    else {
        document.getElementById("play").innerHTML = "Play";
        play = false;
    }
}

function restart() {
    t = 0;
}

function showEVecs() {
    if (!showEigVecs) showEigVecs = true;
    else showEigVecs = false;
}