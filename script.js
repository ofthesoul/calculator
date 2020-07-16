const buffer = [];

const calc = (function(){  
const $display = document.querySelector(".display");
let opPressed = false;

document.querySelectorAll(".numbers").forEach((
    element) => {
        element.onclick = () => {
    if (opPressed) {
        $display.innerText = element.innerText;
        opPressed = false;
        console.log("test1");
    } else if ($display.innerText === "0") {
        $display.innerText = element.innerText;
        console.log("test2");
    } else if ($display.innerText !== "0") {
        $display.innerText = $display.innerText + element.innerText;
        console.log("test3");
    }
}});

const opCallback = opName => () => {
    equalsInARow = "";
    let currentVal = parseFloat($display.innerText);
    
    if (buffer && buffer.length) {
        opPressed = true;
        buffer.push({ value: currentVal });

        const result = evaluate(buffer);
        buffer.push({ value: result });
        buffer.push({ value: opName });

        $display.innerText = buffer[0].value;
    } else { 
        opPressed = true;
        buffer.push({ value: currentVal });
        buffer.push({ value: opName });

        $display.innerText = buffer[0].value;
    }
};

for (const opName of ["add", "subtract", "divide", "multiply"]) {
    document.querySelector(`.operator[data-op=${opName}]`).onclick = opCallback(opName);
};

let equalsInARow = "";
const equalsThreshold = 0;

let firstOperand = 0;
let secondOperand = 0;
let operator = "";
  
let lastRunCalculation = {
  operator: '',
  firstOperand: 0,
  secondOperand: 0,
};
  
const evaluate = buffer => {
    //console.log(buffer);
    //console.log(lastRunCalculation);
    if (equalsInARow > equalsThreshold) {
        console.log("equals pressed over thresh, this is lastruncalc ->", lastRunCalculation);
        secondOperand = lastRunCalculation.secondOperand;
        operator = lastRunCalculation.operator;
        firstOperand = lastRunCalculation.firstOperand;
      } else {
    console.log("equals not over threshold");

    secondOperand = buffer.pop().value;
    operator = buffer.pop().value;
    firstOperand = buffer.pop().value;

    lastRunCalculation.operator = operator;
    lastRunCalculation.secondOperand = secondOperand;
    lastRunCalculation.firstOperand = firstOperand;
    }
  
    switch (operator) {
        case "add":
            return firstOperand + secondOperand;
            break;
        case "subtract":
            return firstOperand - secondOperand;
            break;
        case "multiply":
            return firstOperand * secondOperand;
            break;
        case "divide":
            return firstOperand / secondOperand;
            break;
        default: 
            return secondOperand;
  }
};

document.querySelector('*[data-op="equals"]').onclick = () => {
  console.log(buffer);
    if (buffer && buffer.length) {
        buffer.push({ value: parseFloat($display.innerText)});
        $display.innerText = evaluate(buffer);
        equalsInARow++;
        console.log('equals ran')
    } else if (buffer.length == 0 && lastRunCalculation.operator != '') {
        console.log("equals2 ran")
        let displayText = parseInt($display.innerText);
        lastRunCalculation.firstOperand = parseFloat($display.innerText);
        $display.innerText = evaluate(displayText);
        equalsInARow++;
    }
};

document.querySelector('*[data-op="clear"]').onclick = () => {
    $display.innerText = 0;
    buffer.length = 0;
    equalsInARow = "";
    firstOperand = 0;
    secondOperand = 0;
    operator = "";
  
    repeatOp = secondOperand;
    repeatNum = operator;
  
    lastRunCalculation = {
        operator: '',
        firstOperand: 0,
        secondOperand: 0,
    };
};

document.querySelector('*[data-op="neg"]').onclick = () => { 
    $display.innerText = -parseFloat($display.innerText);
};

document.querySelector('*[data-op="backspace"]').onclick = () => { 
    $display.innerText = $display.innerText.substr(0, $display.innerText.length - 1);
    if($display.innerText == "") {
        $display.innerText = "0";
        };
};

document.querySelector("#decimalbtn").onclick = () => { 
    $display.innerText = $display.innerText.includes(".") 
      ? $display.innerText 
      : $display.innerText + ".";
};


//KEYBOARD USAGE --------------

//END ----------------
return {
test: function() {
    console.log("hey");
    }
  };
})();
//IIFE immediately invoked function
calc.test();