var dataset = [
    {
        question: "Favorite movie",
        choices: ["Kite", "Avengers", "StarWars", "superman"],
        answer: "StarWars"
    },
    {
        question: "Favorite singer",
        choices: ["Arijit", "Atif", "Sanam"],
        answer: "Arijit"
    },
    {
        question: "Favorite city",
        choices: ["Paris", "San Francisco", "Gainesville"],
        answer: "San Francisco"
    }
];


function startQuiz(){
    var hideDiv = document.getElementById('hideDiv');
    hideDiv.style.display = 'none';
    dynamicRadioButton();
}

var dataset_ptr = 0;

function dynamicRadioButton(){

    if(dataset_ptr < dataset.length){
        var count = 100;
        document.getElementById('result').style.display = 'none';
        //Set question
        var question = document.getElementById('question');
        question.innerHTML = dataset[dataset_ptr].question;

        var radiobuttons = document.getElementById('radiobuttons');

        for(var i = 0; i<dataset[dataset_ptr].choices.length; i++){
            var radioOption = document.createElement("input");

            radioOption.setAttribute("type", "radio");
            radioOption.setAttribute("id", "radioYes" + (count++));
            radioOption.setAttribute("name", "Boolean");
            radioOption.setAttribute("value",dataset[dataset_ptr].choices[i]);
            var lblYes = document.createElement("lable");
            var textYes = document.createTextNode(dataset[dataset_ptr].choices[i]);

            lblYes.appendChild(textYes);
            radiobuttons.appendChild(radioOption);
            radiobuttons.appendChild(lblYes);

            var space = document.createElement("span");
            space.setAttribute("innerHTML", "&nbsp;&nbsp");
            radiobuttons.appendChild(space);
        
        }

        var myQuestionSet = document.getElementById('myQuestionSet');
        myQuestionSet.style.display = "block";
    }
    else{
        document.getElementById('myQuestionSet').style.display = "none";
        document.getElementById('result').innerHTML = "End of game";
        document.getElementById('result').style.display = 'block';
    }

}

function clearDiv(){
    var div = document.getElementById('radiobuttons');
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
}

function checkAnswer(){
    var choice_selected = document.querySelector('input[name="Boolean"]:checked').value;
    
    if( choice_selected === dataset[dataset_ptr].answer){
        dataset_ptr++;
        clearDiv();
        dynamicRadioButton();
    }
    else{
        document.getElementById('result').innerHTML = "Answer is wrong. Try Again!";
        document.getElementById('result').style.display = 'block';
    }

}