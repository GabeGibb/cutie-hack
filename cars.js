
class Vehicle{
    constructor(accel, maxSpeed, lane){
       
        // this.accel =  (Math.random() / 100) + 0.05;
        //this.maxSpeed = (Math.random()) + 0.5;
        // this.speed = (Math.random() / 10) + 0.05;
        this.lane = lane;
        this.lastLane = this.lane;
        
        this.trueAccel = accel + Math.random() * accel / 4;
        this.accel = this.trueAccel;
        this.maxSpeed = maxSpeed + Math.random() * maxSpeed / 4;
        this.speed = this.maxSpeed / 10;
        this.x = 0;

        this.width = 20;
        this.stoppingDistance = this.width * STOPPING_DISTANCE;
        this.color = color(255, 255, 255);

        this.yChange = 0;
        this.curY = 0;
    }

    setColor(){
        if (this.accel <= 0){
            let r = (255 - Math.abs(this.speed) * 200  / this.maxSpeed) + 50;
            this.color = color(r, 0, 0)
        }else{
            let g = (this.speed * 200 / this.maxSpeed) + 50;
            this.color = color(0, g, 0);

        }
        // this.color = color()
    }
    // changeToRed(){
    //     // this.color = color(255, 0, 0);
    // }

    // changeToWhite(){
    //     this.color = color(255, 255, 255);
    //     // this.color = color(0, 255, this.speed * 200)
    // }

    tick(nextCar, numLanes){
        

        let nextCarX = 2000;
        if (nextCar != undefined){
            nextCarX = nextCar.x;
        }

        this.setColor();
        
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
        this.laneChange();
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

    laneChange(){
        this.curY += this.yChange * 2;
        if (Math.abs(this.curY) > 54){
            this.curY = 0;
            this.yChange = 0;
        }
    }
}
