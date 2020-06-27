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

let displayVal = "0";
let pendingEval;
let evalStringArray = [];

//FUNCTIONS --------------
let signChangeFlag = false;

updateDisplay = (newValue) => {
    if(displayVal.length > 10) { //character limit
        alert("I'm not THAT smart...");
        return;
        };
    if(displayVal === "0") {
        displayVal = "";
        };
    if(signChangeFlag) {
        displayVal = "";
         };
    displayVal += newValue;
    screen.value = displayVal;
};

operate = (x, y) => { //hitting equal sign button

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
    signChangeFlag = false;
};

backspace = () => {
    screen.value = screen.value.substr(0, screen.value.length - 1);
    displayVal = screen.value;  
    if(displayVal == "" || screen.value == "") {
        displayVal = "0";
        screen.value = "0";
        };
};

addition = (x, y) => {
	return x + y;
};

subctract = (x, y) => {
	return x - y;
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
for (i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", (e) => { updateDisplay(e.target.value) });
};
decibtn.addEventListener("click", (e) => { insertDecimal(e); });
btn0.addEventListener("click", (e) => { updateDisplay(e.target.value) });
acbtn.addEventListener("click", (e) => { allclear(); });
bkspc.addEventListener("click", (e) => { backspace(); });
divibtn.addEventListener("click", (e) => { 
    divibtn.style.backgroundColor = "rgb(177, 124, 26)";
    divide(); 
});
xbtn.addEventListener("click", (e) => { multiply(); });
minusbtn.addEventListener("click", (e) => { subctract(); });
addbtn.addEventListener("click", (e) => { addition(); });
negbtn.addEventListener("click", (e) => { 
    signChangeFlag = true;
    updateDisplay(displayVal * -1);
    signChangeFlag = false;
});
equals.addEventListener("click", (e) => { operate(); });

//KEYBOARD USAGE --------------