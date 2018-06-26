var numCompleted = 0;
var clickedArray = [];

var interval;
var started = false;
var time = 0;

var ready = true;

var points = 0;

document.getElementById("restart").style.display ='none';

document.getElementById("start").addEventListener('click', function(){
    document.getElementById("timer").innerHTML = "Time elapsed: " + time;
    startTimer();
    document.getElementById("displayPoints").innerHTML = "Points = " + points;
    init();

    });


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
    cell.style.backgroundColor = "#702963";
    cell.clicked = false;
}

function revealCell(cell){
    cell.innerHTML = cell.value.toString();
    cell.clicked = true;
    cell.style.backgroundColor = "red";
}

function completedCell(cell){
    cell.completed = true;
    cell.style.backgroundColor = "green";
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
    document.getElementById("start").style.display ='none';
    document.getElementById("restart").style.display ='inline-block';
    var grid = document.getElementsByTagName("td");
    var array = generateRandomArray();
    

    document.addEventListener('keydown',function(evt) {
        if(evt.key > 0 && evt.key < 10){
            grid[evt.key - 1].click();
        }
    });

    document.getElementById("restart").addEventListener('click', function(){
        location.reload();
    });

    for(var i = 0; i<grid.length; i++){
        var cell = grid[i];
        
        cell.value = array[i];
        cell.completed = false;
        cell.clicked = false;
        cell.visited = false;


        cell.addEventListener("mouseenter", function(){
            if(this.clicked == false && this.completed == false)
                this.style.backgroundColor = "#CA3433";
        });

        cell.addEventListener("mouseleave", function() {
            if(this.clicked == false && this.completed == false)
                this.style.backgroundColor = "#702963";
        });

        cell.addEventListener("click", function() {
            if(ready == false)
                return;
           
           
            if(this.clicked == false && this.completed == false){
                clickedArray.push(this);
                revealCell(this);
            }

            if(clickedArray.length == 2){
                
                if(clickedArray[0].value == clickedArray[1].value){
                    points += 20;
                    document.getElementById("displayPoints").innerHTML = "Points = " + points;
                    completedCell(clickedArray[0]);
                    completedCell(clickedArray[1]);

                    clickedArray = [];

                    if(numCompleted == 8){
                        document.getElementById("tablegrid").style.display ='none';
                        document.getElementById("message").innerHTML = " You Won!!";                        
                        clearInterval(interval);
                    }

                }
                else{
                    ready = false;

                    if(clickedArray[0].visited == true || clickedArray[1].visited == true){
                        points -= 10;
                        document.getElementById("displayPoints").innerHTML = "Points = " + points;  
                    }                        
                    document.getElementById("tablegrid").classList.add('error');
                    
                    setTimeout(function(){
                        hideCellGrid(clickedArray[0]);
                        hideCellGrid(clickedArray[1]);
                        clickedArray = [];
                        ready = true;
                        document.getElementById("tablegrid").classList.remove('error');
                    },500);
                }
                clickedArray[0].visited = true;
                clickedArray[1].visited = true;
            }

        });

    }

}