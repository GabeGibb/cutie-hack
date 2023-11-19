document.getElementById("accelerationField").addEventListener('keypress', function(e){if (e.key = "Enter"){document.getElementById("accelerationSlider").value = e.target.value}})
document.getElementById("accelerationSlider").addEventListener("input", function(e){document.getElementById("accelerationField").value = e.target.value})

document.getElementById("maxSpeedField").addEventListener('keypress', function(e){if (e.key = "Enter"){document.getElementById("maxSpeedSlider").value = e.target.value}})
document.getElementById("maxSpeedSlider").addEventListener("input", function(e){document.getElementById("maxSpeedField").value = e.target.value})

document.getElementById("stoppingDistanceField").addEventListener('keypress', function(e){if (e.key = "Enter"){document.getElementById("stoppingDistanceSlider").value = e.target.value}})
document.getElementById("stoppingDistanceSlider").addEventListener("input", function(e){document.getElementById("stoppingDistanceField").value = e.target.value})

document.getElementById("laneChangeFreqField").addEventListener('keypress', function(e){if (e.key = "Enter"){document.getElementById("laneChangeFreqSlider").value = e.target.value}})
document.getElementById("laneChangeFreqSlider").addEventListener("input", function(e){document.getElementById("laneChangeFreqField").value = e.target.value})




document.getElementById("numLanesField").addEventListener('keypress', function(e){if (e.key = "Enter"){document.getElementById("numLanesSlider").value = e.target.value}})
document.getElementById("numLanesSlider").addEventListener("input", function(e){document.getElementById("numLanesField").value = e.target.value})

document.getElementById("trafficFlowField").addEventListener('keypress', function(e){if (e.key = "Enter"){document.getElementById("trafficFlowSlider").value = e.target.value}})
document.getElementById("trafficFlowSlider").addEventListener("input", function(e){document.getElementById("trafficFlowField").value = e.target.value})

document.getElementById("tickRateField").addEventListener('keypress', function(e){if (e.key = "Enter"){document.getElementById("tickRateSlider").value = e.target.value}})
document.getElementById("tickRateSlider").addEventListener("input", function(e){document.getElementById("tickRateField").value = e.target.value})


const AVERAGE_ACCELERATION = Number($("#accelerationField").val());
const MAX_SPEED = Number($("#maxSpeedField").val());
const STOPPING_DISTANCE = Number($("#stoppingDistanceField").val());
const LANE_CHANGE_FREQ = Number($("#laneChangeFreqField").val());
const REACT_SPEED = Number($("#reactSpeedField").val());
const NUM_LANES = Number($("#numLanesField").val());
const TRAFFIC_FLOW = Number($("#trafficFlowField").val());
const TICK_RATE = Number($("#tickRateField").val());

function updateConstants(){
    AVERAGE_ACCELERATION = Number($("#accelerationField").val());
    MAX_SPEED = Number($("#maxSpeedField").val());
    STOPPING_DISTANCE = Number($("#stoppingDistanceField").val());
    LANE_CHANGE_FREQ = Number($("#laneChangeFreqField").val());
    REACT_SPEED = Number($("#reactSpeedField").val());
    NUM_LANES = Number($("#numLanesField").val());
    TRAFFIC_FLOW = Number($("#trafficFlowField").val());
    TICK_RATE = Number($("#tickRateField").val());
}
