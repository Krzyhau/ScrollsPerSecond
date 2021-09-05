var counter = 0;

var firstTime = 0;
var lastTime = 0;
var lastDir = 0;

var lastSps = 0;
var bestSPS = 0;

const maxDelay = 500;

function SPSOnWheel(event) {
    event.preventDefault();
    let dir = event.deltaY / Math.abs(event.deltaY);

    // reset values if took too long or changed scroll direction
    let now = Date.now();
    if (now > lastTime + maxDelay || lastDir != dir) {
        counter = 0;
        lastDir = dir;
        firstTime = now;
        if (lastSps > bestSPS) bestSPS = lastSps;
    }
    lastTime = now;
    
    //increase counter
    counter++;

    let time = (now - firstTime);
    lastSps = time == 0 ? 1 : counter / (now - firstTime) * 1000;


    document.querySelector("#counter").innerHTML = counter;
    document.querySelector("#time").innerHTML = (now - firstTime);
    document.querySelector("#sps").innerHTML = lastSps.toFixed(3);
    document.querySelector("#best").innerHTML = bestSPS.toFixed(3);

    console.log(dir);
}

window.addEventListener('wheel', SPSOnWheel);