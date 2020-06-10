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
const screen = document.querySelector(".display");
const numbers = document.getElementsByClassName("numbers");

let displayVal = "0";
let pendingEval;
let evalStringArray = [];

//FUNCTIONS
updateDisplay = (e) => {
let btnVal = e.target.innerText;
if(displayVal === "0") {
    displayVal = "";
    }
displayVal += btnVal;
screen.innertext = displayVal;
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

//EVENT LISTENERS


