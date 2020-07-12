var parameters = {
    target: '#myFunctionGraph',
    xAxis: {
      
      domain: [0, 2*Math.PI]
    }, 
    yAxis: {
      
      domain: [-1,1]
    },
    grid: true,
    data: [
      { fn: 'sin(x)',
        color: 'red'
      }    
    ]
  };
  
  function init(){
    
     var xMin = document.querySelector("#xMin").value;
     var xMax = document.querySelector("#xMax").value;
     var yMin = document.querySelector("#yMin").value;
     var yMax = document.querySelector("#yMax").value;
     var func = document.querySelector("#function").value;
      var color = document.querySelector("#color").value;
     parameters.xAxis.domain = [xMin, xMax];
     parameters.yAxis.domain = [yMin, yMax]; 
     parameters.data[0].fn = func;
     parameters.data[0].color = color;
     functionPlot(parameters);
  }

  function addRowToTable(firstname, lastname){
    var tableBody = document.querySelector("#tableBody");
    var newRow = tableBody.insertRow();
    var firstNameCell = newRow.insertCell();
    firstNameCell.innerHTML = firstname;
    var lastNameCell = newRow.insertCell();
    lastNameCell.innerHTML = lastname;
  }

  function buildTable(){
    addRowToTable("Poornima", "Kumar");
    addRowToTable("Saurav", "Kumar");
  }