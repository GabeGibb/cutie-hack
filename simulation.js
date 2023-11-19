class Simulation{
    constructor(numLanes, trafficFlow, tickRate, percentTrucks, laneChangeFreq){
        this.numLanes = numLanes;
        this.trafficFlow = trafficFlow;
        this.tickRate = tickRate;
        this.percentTrucks = percentTrucks;
        this.laneChangeFreq = laneChangeFreq;

        this.vehicles = [];
        for(let i = 0; i < this.numLanes; i++){
            this.vehicles.push([]);
        }

        this.counter = 0;
    }

    tick(){
        for (let j = 0; j < this.tickRate; j++){
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
                this.vehicles[randLanes[i]].unshift(new Vehicle());
            
            }
        }

        
        if (Math.floor(Math.random() * 100) < this.laneChangeFreq){
            let laneToChange = Math.floor(Math.random() * this.numLanes);
            if (this.vehicles[laneToChange].length != 0){
                let indexToChange = Math.floor(Math.random() * this.vehicles[laneToChange].length);
                let cur = this.vehicles[laneToChange][indexToChange];
                let dir = 0;
                if (laneToChange == 0){
                    dir = 1;
                }
                else if (laneToChange == this.numLanes - 1){
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
                let carInFront = false;
                for(let i = 0; i < this.vehicles[newLane].length; i++){
                    if (this.vehicles[newLane][i].x > cur.x){
                        this.vehicles[newLane].splice(i, 0, cur);
                        carInFront = true;
                        break;
                    }
                }
                if (carInFront == false){ //if no car is in front try to 
                    this.vehicles[newLane].push(cur);
                }
                this.vehicles[laneToChange].splice(indexToChange, 1);
                
            }
        }
        
        // let randLane = Math.floor(Math.random() * this.numLanes);
        for(let j = 0 ; j < this.numLanes; j++){
            for(let i = 0; i < this.vehicles[j].length; i++){
                let cur = this.vehicles[j][i];
                cur.tick(this.vehicles[j][i+1]);
                
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
                rect(cur.x, startY + (j * laneHeight * laneSpacing), cur.width, laneHeight/4);
            }
        }
    }


}

function restartSim(){
    //ah
}