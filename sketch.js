function setup() {
    var myCanvas = createCanvas(1000, 400);
    myCanvas.parent("canvasParent");
}
  
var sim = new Simulation();


function draw() {
    frameRate(60);
    background(220);
    sim.tick();

}