
class Vehicle{
    constructor(lane){
        this.lane = lane;
        this.lastLane = this.lane;
        
        this.accel = AVERAGE_ACCELERATION;
        this.speed = MAX_SPEED / 10;
        this.x = 0;

        this.width = 20;
        this.color = color(255, 255, 255);

        this.yChange = 0;
        this.curY = 0;
    }

    setColor(){
        if (this.accel <= 0){
            // let r = (255 - Math.abs(this.speed) * 200  / MAX_SPEED) + 50;
            this.color = color(255, 0, 0)
        }else{
            // let g = (this.speed * 200 / MAX_SPEED) + 50;
            this.color = color(0, 255, 0);

        }
        // this.color = color()
    }

    stoppingDistance(){
        return this.width * STOPPING_DISTANCE;
    }


    tick(nextCar, numLanes){
        

        let nextCarX = 2000;
        if (nextCar != undefined){
            nextCarX = nextCar.x;
        }

        this.setColor();
        
        if((nextCarX - this.x) > this.stoppingDistance()) {
            this.accelerate();
        }
        else if(((nextCarX - this.x) < this.stoppingDistance()) && this.speed > 0) {
            if ((nextCarX - this.x) < this.width){
                this.speed = 0;
            }else{
                this.brake();
            }
        }
        else {
            this.cruise();
        }

        

        this.move();
        this.lastLane = this.lane;
        this.laneChange();
    }

    accelerate() {
        this.accel = AVERAGE_ACCELERATION;
    }


    brake() {
        this.accel = AVERAGE_ACCELERATION * -2;
    }
    
    cruise() {
        this.accel = 0;
    }

    move() {
        let nextSpeed = this.speed + this.accel;
        let nextX = this.x + this.speed;
        if(nextSpeed > 0 && nextSpeed <= MAX_SPEED) {
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
