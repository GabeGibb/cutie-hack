class Simulation{
    constructor(numLanes, trafficFlow, tickRate, percentTrucks){
        this.numLanes = numLanes;
        this.trafficFlow = trafficFlow;
        this.tickRate = tickRate;
        this.percentTrucks = percentTrucks;

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
        if (Math.floor(Math.random() * 60) < this.trafficFlow){
            let randLanes = []; //array of lanes that will have new cars
            for(let i = 0; i < this.numLanes; i++){
                if (Math.floor(Math.random() * this.numLanes * this.numLanes) == 0){
                    randLanes.push(i); //randomly choose which lanes will have cars
                }
            }
            
            for(let i = 0; i < randLanes.length; i++){
                this.vehicles[randLanes[i]].push(new Vehicle());
            }
        }
        
        // let randLane = Math.floor(Math.random() * this.numLanes);
        for(let j = 0 ; j < this.numLanes; j++){
            for(let i = 0; i < this.vehicles[j].length; i++){
                let cur = this.vehicles[j][i];
                cur.tick(this.vehicles[j][i-1]);
                
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