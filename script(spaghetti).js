const calc = (function(){
// BUTTONS & DECLARATIONS --------------
const btn0 = document.getElementById("zerobtn");
const btn1 = document.getElementById("1btn");
const btn2 = document.getElementById("2btn");
const btn3 = document.getElementById("3btn");
const btn4 = document.getElementById("4btn");
const btn5 = document.getElementById("5btn");
const btn6 = document.getElementById("6btn");
const btn7 = document.getElementById("7btn");
const btn8 = document.getElementById("8btn");
const btn9 = document.getElementById("9btn");
const decibtn = document.getElementById("decimalbtn");
const divibtn = document.getElementById("/btn");
const xbtn = document.getElementById("*btn");
const minusbtn = document.getElementById("-btn");
const addbtn = document.getElementById("+btn");
const negbtn = document.getElementById("+-btn");
const bkspc = document.getElementById("backspacebtn");
const acbtn = document.getElementById("allclearbtn");
const equals = document.getElementById("equalsignbtn"); 
const screen = document.querySelector(".display");
const numbers = document.getElementsByClassName("numbers");
const DISPLAY_LIMIT = 12;

let displayVal = "0";
let evalStringArray = "0"
let operatorClicked = false;

//FUNCTIONS --------------
signChangeFlag = false;
additionFlag = false;
subtractionFlag = false;
multiplyFlag = false;
divideFlag = false;
justUpdatedFlag = false;


updateDisplay = (newValue) => {
    if(displayVal.length > DISPLAY_LIMIT) { //character limit
        alert("I'm not THAT smart...");
        return;

        } else if (displayVal === "0") {
        displayVal = "";

        } else if (signChangeFlag) {
        displayVal = "";
         };

    displayVal += newValue;
    screen.value = displayVal;
};
toInt = (str1, str2) => {
    numX = parseFloat(str1);
    numY = parseFloat(str2);
};

operate = (x, y) => { //hitting equal button
        let sum = "";
        toInt(x, y);
    if (additionFlag === true) {
        addbtn.style.backgroundColor =  "rgb("+255+"," +179+"," +39+")";
        sum = (numX + numY);
    } else if (subtractionFlag === true) {
        sum = (numX - numY);
    } else if (divideFlag === true) {
        sum = (numX / numY);
    } else if (multiplyFlag === true) {
        sum = (numX * numY);
    } else if (justUpdatedFlag === true) { 
        sum = "0";
    }
        displayVal = "0"
        justUpdatedFlag = true;
        updateDisplay(sum);
};

oneFlag = () => { //trying to make it where you switch one on, the other switches off.
    if (additionFlag === true) {
        signChangeFlag = false;
        subtractionFlag = false;
        multiplyFlag = false;
        divideFlag = false;
        justUpdatedFlag = false;
        additionFlag = false;
        minusbtn.style.backgroundColor =  "rgb("+255+"," +179+"," +39+")";
    } else if (subtractionFlag === true) {
        signChangeFlag = false;
        additionFlag = false;
        multiplyFlag = false;
        divideFlag = false;
        justUpdatedFlag = false;
        subtractionFlag = false;
        addbtn.style.backgroundColor =  "rgb("+255+"," +179+"," +39+")";
    } else if (divideFlag === true) {
        signChangeFlag = false;
        additionFlag = false;
        subtractionFlag = false;
        multiplyFlag = false;
        justUpdatedFlag = false;
        divibtn.style.backgroundColor =  "rgb("+255+"," +179+"," +39+")";
    } else if (multiplyFlag === true) {
        signChangeFlag = false;
        additionFlag = false;
        subtractionFlag = false;
        divideFlag = false;
        justUpdatedFlag = false;
        multiplyFlag = false;
        xbtn.style.backgroundColor =  "rgb("+255+"," +179+"," +39+")";
    };
};

insertDecimal = (e) => { 
    if (screen.value.includes(".")) {
        alert("Too many decimals.");
        return;
        };
    updateDisplay(e.target.value); 
};

allclear = () => { 
    screen.value = "0";
    displayVal = "0";
    evalStringArray = "0";
    signChangeFlag = false;
    additionFlag = false;
    subtractionFlag = false;
    multiplyFlag = false;
    divideFlag = false;
    justUpdatedFlag = false;
    addbtn.style.backgroundColor =  "rgb("+255+"," +179+"," +39+")";
    minusbtn.style.backgroundColor =  "rgb("+255+"," +179+"," +39+")";
    divibtn.style.backgroundColor =  "rgb("+255+"," +179+"," +39+")";
    xbtn.style.backgroundColor =  "rgb("+255+"," +179+"," +39+")";
    negbtn.style.backgroundColor =  "rgb("+255+"," +179+"," +39+")";
};

backspace = () => {
    screen.value = screen.value.substr(0, screen.value.length - 1);
    displayVal = screen.value;  
    if(displayVal == "" || screen.value == "") {
        displayVal = "0";
        screen.value = "0";
        };
};

addition = () => {
    oneFlag();
    additionFlag = true;
    evalStringArray = displayVal;
    displayVal = "0";
    addbtn.style.backgroundColor =  "rgb("+247+"," +214+"," +153+")";
};

subtract = () => {
    oneFlag();
    subtractionFlag = true;
    evalStringArray = displayVal;
    displayVal = "0";
    minusbtn.style.backgroundColor =  "rgb("+247+"," +214+"," +153+")";
};

multiply = (array) => {
	if(array.length === 0) {
		return 0;
	};
	sum = array.reduce((total, amount) => total * amount);
	return sum;
};

divide = (x, y) => {
	return x / y;
};

//EVENT LISTENERS --------------
document.body.addEventListener("click", (e) => {
    console.log(e.target);
    const $clickedElement = event.target;
    if ($clickedElement.classList.contains("numbers")) {
        if (justUpdatedFlag === true) {
            allclear();
            justUpdatedFlag = false;
        }
        operatorClicked = false;
        updateDisplay(e.target.value);
    } else if ($clickedElement.id === "backspacebtn") {
        backspace();
    } else if ($clickedElement.id === "allclearbtn") {
        allclear();
    } else if ($clickedElement.id === "zerobtn") {
        updateDisplay(e.target.value)
    } else if ($clickedElement.id === "/btn") {
        updateDisplay(e.target.value)
    } else if ($clickedElement.id === "*btn") {
        updateDisplay(e.target.value)
    } else if ($clickedElement.id === "-btn") {
        if (subtractionFlag === true) {
            operate(evalStringArray, displayVal);
            oneFlag();
        }
        subtract();
    } else if ($clickedElement.id === "+btn") {
        if (additionFlag === true && !operatorClicked) {
            operatorClicked = true;
            operate(evalStringArray, displayVal);
            oneFlag();
        } else {
            console.log("operator clicked")
        }
        addition();
    } else if ($clickedElement.id === "+-btn") {
        signChangeFlag = true;
        updateDisplay(displayVal * -1);
        signChangeFlag = false;
    } else if ($clickedElement.id === "decimalbtn") {
        updateDisplay(e.target.value)
    } else if ($clickedElement.id === "equalsignbtn") {
        operate(evalStringArray, displayVal);
        subtractionFlag = false;
        additionFlag = false;
    };
});

//KEYBOARD USAGE --------------




//END ----------------
return {
test: function() {
    console.log("hey");
}};

})();
//IIFE immediately invoked function
calc.test();