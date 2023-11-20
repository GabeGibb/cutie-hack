class Simulation{
    constructor(){

        this.vehicles = [];
        for(let i = 0; i < NUM_LANES; i++){
            this.vehicles.push([]);
        }

        this.counter = 0;
    }

    tick(){

        for (let j = 0; j < TICK_RATE; j++){
            this.tickLogic();
        }
    }

    changeLaneLogic(){ 
        if (Math.floor(Math.random() * 100) >= LANE_CHANGE_FREQ){
            return;
        }
        let ticketPenalty = 55;
        let totalTickets = NUM_LANES * 100 - (2 * ticketPenalty);
        let ticketArr = [];
        for(let i = 0; i < NUM_LANES; i++) {
            if(i == 0 || i == NUM_LANES - 1) {
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
            ticketCounter += ticketArr[i];
            laneToChange = i;
            i++;
        }


        if (this.vehicles[laneToChange].length == 0){
            return;
        }
        let indexToChange = Math.floor(Math.random() * this.vehicles[laneToChange].length);
        let cur = this.vehicles[laneToChange][indexToChange];
        if (cur.curY != 0){
            return;
        }
        let dir = 0;
        if (laneToChange == 0){
            dir = 1;
        }
        else if (laneToChange >= NUM_LANES - 1){
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
                if (this.vehicles[newLane][i].x < cur.x + cur.width){
                    return;
                }
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

    spawnCars(){
        if (Math.floor(Math.random() * 60) < TRAFFIC_FLOW){ //spawn cars
            let randLanes = []; //array of lanes that will have new cars
            for(let i = 0; i < NUM_LANES; i++){
                if (Math.floor(Math.random() * NUM_LANES * NUM_LANES) == 0){
                    randLanes.push(i); //randomly choose which lanes will have cars
                }
            }
            
            for(let i = 0; i < randLanes.length; i++){
                this.vehicles[randLanes[i]].unshift(new Vehicle(randLanes[i]));
            
            }
        }
    }



    tickLogic(){
        this.spawnCars();
        this.changeLaneLogic();
        // console.log(this.vehicles)
        // console.log(NUM_LANES)
        for(let j = 0 ; j < this.vehicles.length; j++){

            for(let i = 0; i < this.vehicles[j].length; i++){
                let cur = this.vehicles[j][i];
                cur.tick(this.vehicles[j][i+1], NUM_LANES);
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
        for(let j = 0 ; j < this.vehicles.length; j++){
            for(let i = 0; i < this.vehicles[j].length; i++){
                let cur = this.vehicles[j][i];
                // color(255, 0, 0);
                rectMode(CENTER);
                fill(cur.color);
                if (cur.curY != 0){
                    rect(cur.x * screenWidth / 1000, startY + ((j - cur.yChange) * laneHeight * laneSpacing) + cur.curY, cur.width * screenWidth / 1000, laneHeight/4);
                }else{
                    rect(cur.x * screenWidth / 1000, startY + (j * laneHeight * laneSpacing), cur.width * screenWidth / 1000, laneHeight/4);
                }
                
            }
        }
    }


    update(){
        let newVehicles = [];
        for(let i = 0; i < NUM_LANES; i++){
            if (i < this.vehicles.length){
                newVehicles.push(this.vehicles[i])
            }else{
                newVehicles.push([])
            }
        }
        this.vehicles = newVehicles;
    }   
}
