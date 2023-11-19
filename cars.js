
class Vehicle{
    constructor(accel, maxSpeed, lane){
       
        // this.accel =  (Math.random() / 100) + 0.05;
        //this.maxSpeed = (Math.random()) + 0.5;
        // this.speed = (Math.random() / 10) + 0.05;
        this.lane = lane;
        this.lastLane = this.lane;
        
        this.trueAccel = accel;

        this.accel = accel;
        this.maxSpeed = maxSpeed;
        this.speed = this.maxSpeed / 10;
        this.x = 0;

        this.width = 20;
        this.stoppingDistance = this.width * STOPPING_DISTANCE;
        this.color = color(255, 255, 255);
    }

    changeToRed(){
        this.color = color(255, 0, 0);
    }

    changeToWhite(){
        this.color = color(0, 255, 255);
    }

    tick(nextCar, numLanes){
        if (this.lastLane != this.lane) {
            // switch(this.lane) {
            //     case 0:
            //         this.maxSpeed *= 1;
            //         break;
            //     case 1:
            //         this.maxSpeed *= 0.9;
            //         break;
            //     case 2:
            //         this.maxSpeed *= 0.8;
            //         break;
            //     case 3:
            //         this.maxSpeed *= 0.7;
            //         break;
            // }
        }

        let nextCarX = 2000;
        if (nextCar != undefined){
            nextCarX = nextCar.x;
        }

        if((nextCarX - this.x) < this.stoppingDistance) {
            this.changeToRed();
        }
        else { 
            this.changeToWhite();
        }
        
        if((nextCarX - this.x) > this.stoppingDistance) {
            this.accelerate();
        }
        else if(((nextCarX - this.x) < this.stoppingDistance) && this.speed > 0) {
            this.brake();
        }
        else {
            this.cruise();
        }

        // if(numLanes - 1 == this.lane) {
        //     // this.accel = 0.0075;
        //     if (this.x >= 400) {
        //         this.brake();
        //     }
        //     if (this.x >= 500){
        //         this.accel = this.trueAccel * -5;
        //     }
        // }

        this.move();
        this.lastLane = this.lane;
    }

    accelerate() {
        this.accel = this.trueAccel;
    }


    brake() {
        this.accel = this.trueAccel * -2;
    }
    
    cruise() {
        this.accel = 0;
    }

    move() {
        let nextSpeed = this.speed + this.accel;
        let nextX = this.x + this.speed;
        if(nextSpeed > 0 && nextSpeed <= this.maxSpeed) {
            this.speed = nextSpeed;
        }
        this.x = nextX;
    }
}

// class Car extends Vehicle{

// }

// class Truck extends Vehicle{

// }