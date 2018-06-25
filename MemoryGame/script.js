var numCompleted = 0;
var clickedArray = [];

var interval;
var started = false;
var time = 0;

var ready = true;

init();

function generateRandomArray(){
    var array = [1,1,2,2,3,3,4,4,5];
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

function hideCellGrid(cell){
    cell.innerHTML = "";
    cell.style.backgroundColor = "blue";
    cell.clicked = false;
}

function revealCell(cell){
    cell.innerHTML = cell.value.toString();
    cell.clicked = true;
    cell.style.backgroundColor = "red";
}

function completedCell(cell){
    cell.completed = true;
    cell.style.backgroundColor = "purple";
    numCompleted++;
}

function startTimer(){
    if(started == false){
        interval = setInterval(function(){
            time++;
            document.getElementById("timer").innerHTML = "Time elapsed: " + time;
        }, 1000);
        started = true;
    }
}
function init(){
    var grid = document.getElementsByTagName("td");
    var array = generateRandomArray();
    for(var i = 0; i<grid.length; i++){
        var cell = grid[i];
        
        cell.value = array[i];
        cell.completed = false;
        cell.clicked = false;

        cell.addEventListener("mouseenter", function(){
            if(this.clicked == false && this.completed == false)
                this.style.backgroundColor = "orange";
        });

        cell.addEventListener("mouseleave", function() {
            if(this.clicked == false && this.completed == false)
                this.style.backgroundColor = "blue";
        });

        cell.addEventListener("click", function() {
            if(ready == false)
                return;
            startTimer();
            if(this.clicked == false && this.completed == false){
                clickedArray.push(this);
                revealCell(this);
            }

            if(clickedArray.length == 2){
                if(clickedArray[0].value == clickedArray[1].value){
                    completedCell(clickedArray[0]);
                    completedCell(clickedArray[1]);

                    clickedArray = [];

                    if(numCompleted == 8){
                        document.getElementById("tablegrid").style.display ='none';
                        document.getElementById("message").innerHTML = "Won";                        
                        clearInterval(interval);
                    }

                }
                else{
                    ready = false;
                    document.getElementById("tablegrid").style.border = "5px solid red";
                    setTimeout(function(){
                        hideCellGrid(clickedArray[0]);
                        hideCellGrid(clickedArray[1]);
                        clickedArray = [];
                        ready = true;
                        document.getElementById("tablegrid").style.border = "5px solid black";
                    },500);
                }
            }

        });

    }

}