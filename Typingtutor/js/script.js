
//Words for the dictionary
var dictionary = [
                    ["cat", "bat"], 
                    ["hello", "world"]
                    //["monkey", "butter"]
                 ];


//HTML fields
var word;
var textInput;
var displayOutput;
var start;
var end;
var leaderBoard;
var username;
var btn_resetScoreboard;

//Game variables
var level = 0;
var itrLevel = 0;
var score = 0;
var name;


window.addEventListener('load', function(evt){
    
    word = document.getElementById('word');
    textInput = document.querySelector('#userText');
    displayOutput = document.querySelector('#result');
    start = document.querySelector('#start');
    end = document.querySelector('#end');
    leaderboard = document.querySelector('#leaderBoard');
    username = document.querySelector('#username');
    btn_resetScoreboard = document.querySelector('#resetScoreboard');

    start.addEventListener('click', startGame);
    end.addEventListener('click', endGame);
    leaderboard.addEventListener('click', displayLeaderBoard);
    btn_resetScoreboard.addEventListener('click', resetScoreboard);

    
});


function endGame(){
    document.body.innerHTML = "Game over" + "Your score = " + score;
    localStorage.setItem(name, score.toString());
    displayLeaderBoard();
}

function startGame(){
    resetValues();
    name = username.value;
    if(name == '')
        alert("Please enter username");

    textInput.addEventListener('keydown', function(evt) {
        if(evt.key == "Enter"){
           var result = checkStrings(dictionary[level][itrLevel], textInput.value);
           changeDictionaryWord(result);
           
        }
    });
}

function resetValues(){
    name = '';
    score = 0;
    level = 0;
    itrLevel = 0;
    word.innerHTML = dictionary[level][itrLevel];
    displayOutput.innerHTML = "";
}

function changeDictionaryWord(result){
    if (result == false) {
        score -= 10;
        displayOutput.innerHTML = "Wrong!";
    }
    else{
        score += 10;
        displayOutput.innerHTML = "";
    }
    itrLevel++;
    if (itrLevel == dictionary[level].length) {
        level++;
        itrLevel = 0;   
    }
    if (level == dictionary.length) {
        endGame();
    }
    else {
        word.innerHTML = dictionary[level][itrLevel];
        textInput.value = "";
    }
}


function checkStrings(string1 , string2){
    if(string1 === string2.trim())
        return true;
    else
        return false;
}

function displayLeaderBoard(){
    if(localStorage.length == 0)
        console.log("Nothing to display");
    for(var i = 0; i<localStorage.length; i++){
        console.log(localStorage.key(i) + " " + localStorage.getItem(localStorage.key(i)));
    }

}

function resetScoreboard(){
    localStorage.clear();
}

