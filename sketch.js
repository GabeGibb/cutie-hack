
let numLanes = 3;
let trafficFlow = 5;
let tickRate = 1;
let percentTrucks = 0;
let laneChangeFreq = 2;
var sim = new Simulation(numLanes, trafficFlow, tickRate, percentTrucks, laneChangeFreq);



function preload(){
    lane = loadImage("media/lane.jpg") 
    lane.loadPixels();
    
    // laneHeight = lane.height;
}

var laneHeight;
var laneWidth;
var laneSpacing = 1.1;
var laneStartSpace;

var myCanvas;
function setup() {
    laneHeight = lane.height;
    laneWidth = lane.width;
    laneStartSpace = (laneSpacing-1) * laneHeight;

    myCanvas = createCanvas(windowWidth * 7 / 8, (laneHeight * numLanes * laneSpacing) + laneStartSpace);
    myCanvas.parent("canvasParent");
}
  

function draw() {
    frameRate(60);
    background(140, 145, 144);
    for(let j = 0; j < numLanes; j++){
        for(let i = 0; i < Math.ceil(width / laneWidth); i++){
            image(lane,i * laneWidth,j * laneHeight * laneSpacing + laneStartSpace);
        }
    }
    sim.tick();
    sim.draw(laneHeight, laneSpacing, laneStartSpace, width);
}

function restart(){

}

