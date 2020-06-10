// BUTTONS & DECLARATIONS
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
const bkspc = document.getElementById("backspace");
const acbtn = document.getElementById("allclearbtn");
const equals = document.getElementById("equalsignbtn"); 
const screen = document.getElementsByClassName("display");
let displayVal = "0";
let pendingEval = [];
let evalStringArray = "";

//EVENT LISTENERS
const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", (event) => {
    const { target } = event;
    if (target.classList.contains("operator")) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains("decibtn")) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains("acbtn")) {
        resetCalculator();
        updateDisplay();
        return;
    }
    if (target.classList.contains("bkspc")) {
        backspace();
        updateDisplay();
        return;
    }
    if (target.classList.contains("negbtn")) {
        changeSign();
        updateDisplay();
        return;
    }
    if (target.classList.contains("num")) {
        inputNumber(target.value);
        updateDisplay(); 
    }
});

document.addEventListener("keydown", (event) => {
    const { key } = event;
    if (isNaN(key)) {
        if (key === "Enter") {
            handleOperator("=");
            updateDisplay();
            return;
        }
        if (key === "+" || key === "-" || key === "/" || key === "*") {
            handleOperator(key);
            updateDisplay();
            return;
        }  
        if (key === ".") {
            inputDecimal(key);
            updateDisplay();
            return;
        }
        if (key === "Escape") {
            resetCalculator();
            updateDisplay();
            return;
        }     
        if (key === "Backspace") {
            backspace();
            updateDisplay();
            return;
        }
    }
    else {
        inputNumber(key);
        updateDisplay();
    }
})


//FUNCTIONS

function updateDisplay(){

};

function handleOperator(){

};

function inputDecimal(){

};

function inputNumber() {

};

function multiply (array) {
	if(array.length === 0) {
		return 0;
	};
	sum = array.reduce((total, amount) => total * amount);
	return sum;
}

function add(x, y) {
	return x + y;
}

function subtract (x, y) {
	return x - y;
}

function divide(x, y) {
	return x / y;
}

