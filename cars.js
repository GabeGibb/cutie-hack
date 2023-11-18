class Vehicle{
    constructor(){
        this.accel = .1;
        this.maxSpeed = 60;
        this.speed = 0;
        this.x = 0;
        
    }

    tick(){
        this.speed += this.accel;
        this.x += this.speed;
    }
}

class Car extends Vehicle{

}

class Truck extends Vehicle{

}