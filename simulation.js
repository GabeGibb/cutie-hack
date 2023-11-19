class Simulation{
    constructor(numLanes, trafficFlow, laneChangeFreq){
        this.numLanes = numLanes;
        this.trafficFlow = trafficFlow;
        this.laneChangeFreq = laneChangeFreq;

        this.vehicles = [];
        for(let i = 0; i < this.numLanes; i++){
            this.vehicles.push([]);
        }

        this.counter = 0;

    }

    tick(){
        for (let j = 0; j < TICK_RATE; j++){
            this.tickLogic();
        }
    }

    tickLogic(){
        if (Math.floor(Math.random() * 60) < this.trafficFlow){ //spawn cars
            let randLanes = []; //array of lanes that will have new cars
            for(let i = 0; i < this.numLanes; i++){
                if (Math.floor(Math.random() * this.numLanes * this.numLanes) == 0){
                    randLanes.push(i); //randomly choose which lanes will have cars
                }
            }
            
            for(let i = 0; i < randLanes.length; i++){
                this.vehicles[randLanes[i]].unshift(new Vehicle(AVERAGE_ACCELERATION, MAX_SPEED, randLanes[i]));
            
            }
        }
        
        if (Math.floor(Math.random() * 100) < this.laneChangeFreq){
            let ticketPenalty = 55;
            let totalTickets = this.numLanes * 100 - (2 * ticketPenalty);
            let ticketArr = [];
            for(let i = 0; i < this.numLanes; i++) {
                if(i == 0 || i == this.numLanes - 1) {
                    ticketArr[i] = 100 - ticketPenalty;
                }
                else {
                    ticketArr[i] = 100;
                }
            }
            let goldenTicket = Math.floor(Math.random() * totalTickets);
            let ticketCounter = 0;
            let laneToChange = 0;
            let i = 0;
            while (ticketCounter < goldenTicket) {
                // console.log(ticketCounter)
                ticketCounter += ticketArr[i];
                laneToChange = i;
                i++;
            }
            // console.log(laneToChange)

            if (this.vehicles[laneToChange].length != 0){
                let indexToChange = Math.floor(Math.random() * this.vehicles[laneToChange].length);
                let cur = this.vehicles[laneToChange][indexToChange];
                if (cur.curY == 0){
                    let dir = 0;
                    if (laneToChange == 0){
                        dir = 1;
                    }
                    else if (laneToChange >= this.numLanes - 1){
                        dir = -1;
                    }
                    else{
                        if (Math.random() > 0.5){
                            dir = 1;
                        }else{
                            dir = -1;
                        }
                    }
                    
                    let newLane = laneToChange + dir;
                    cur.lane = newLane;
                    let carInFront = false;
                    for(let i = 0; i < this.vehicles[newLane].length; i++){
                        if (this.vehicles[newLane][i].x > cur.x){ //once you find car in front of current car in another lane swap current car to behind other car in other lane
                            this.vehicles[newLane].splice(i, 0, cur); //lane change
                            carInFront = true;
                            break;
                        }
                    }
                    if (carInFront == false){ 
                        this.vehicles[newLane].push(cur); //car is already in front of other cars in lane
                    }
                    this.vehicles[laneToChange].splice(indexToChange, 1); //remove from previous lane
                    cur.yChange = dir;

                }
            }
        }
        
        // let randLane = Math.floor(Math.random() * this.numLanes);
        for(let j = 0 ; j < this.numLanes; j++){
            for(let i = 0; i < this.vehicles[j].length; i++){
                let cur = this.vehicles[j][i];
                cur.tick(this.vehicles[j][i+1], this.numLanes);
                if (cur.x > 1000){
                    this.vehicles[j].splice(i,1);
                }
            }
        }


        this.counter += 1
        if (this.counter >= 60){
            this.counter = 0;
        }

    }

    draw(laneHeight, laneSpacing, start, screenWidth){
        let startY = laneSpacing * laneHeight / 2 + start;
        for(let j = 0 ; j < this.numLanes; j++){
            for(let i = 0; i < this.vehicles[j].length; i++){
                let cur = this.vehicles[j][i];
                // color(255, 0, 0);
                rectMode(CENTER);
                fill(cur.color);
                if (cur.curY != 0){
                    // let startDir;
                    // if (cur.yChange < 0){
                    //     startDir = 1
                    // }else{
                    //     startDir = 1
                    // }
                    rect(cur.x * screenWidth / 1000, startY + ((j - cur.yChange) * laneHeight * laneSpacing) + cur.curY, cur.width, laneHeight/4);
                }else{
                    rect(cur.x * screenWidth / 1000, startY + (j * laneHeight * laneSpacing), cur.width, laneHeight/4);
                }
                
            }
        }
    }
}
