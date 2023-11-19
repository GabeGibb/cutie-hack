function toMpt(mph){
    return mph / 60 / 60 / 60;
}


class Vehicle{
    constructor(accel, maxSpeed, stoppingDistance, laneChangeFrequency, reactionSpeed){
       
        // this.accel =  (Math.random() / 100) + 0.05;
        // this.maxSpeed = (Math.random()) + 0.5;
        // this.speed = (Math.random() / 10) + 0.05;
        this.accel = .01;
        this.maxSpeed = 1;
        this.speed = 0.1;
        this.x = 0;

        this.width = 20;
        this.stoppingDistance = this.width * 2;
        this.color = color(255, 255, 255);
    }

    changeToRed(){
        this.color = color(255, 0, 0);
    }

    changeToWhite(){
        this.color = color(0, 255, 255);
    }

    tick(nextCar){
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

        this.move();
    }

    accelerate() {
        this.accel = 0.01;
    }


    brake() {
        this.accel = -0.01;
    }
    
    cruise() {
        this.accel = 0;
    }

    move() {
        let nextSpeed = this.speed + this.accel;
        let nextX = this.x + this.speed;
        if(nextSpeed > 0) {
            this.speed = nextSpeed;
        }
        this.x = nextX;
    }
}

// class Car extends Vehicle{

// }

// class Truck extends Vehicle{

// }