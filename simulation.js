class Simulation{
    constructor(){
        this.car = new Car();
    }

    tick(){
        this.car.tick();
        translate(this.car.x, 0)
        rect(0, 0, 10,10);
    }


}

function restartSim(){
    //ah
}