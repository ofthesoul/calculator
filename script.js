const calc = (function(){
// DECLARATIONS & EVENT LISTENERS --------------

const $display = document.querySelector(".display");
const DISPLAY_LIMIT = 12;
const buffer = [];

document.querySelectorAll(".numbers").forEach(   // NEW 
    element => {
        element.onclick = () => $display.value = $display.value !== "0" ? 
        $display.value + element.innerText : element.innerText
    }
)
const opCallback = opName => () => {
    let currentVal = parseFloat($display.value);

    if (buffer && buffer.length) {
        buffer.push({ value: currentVal });

        const result = evaluate(buffer);

        buffer.push({ value: result });
        buffer.push({ value: opName });
        $display.value = "";
    } else {
        buffer.push({ value: currentVal });
        buffer.push({ value:opName });
        $display.value = "";
    }
}
 
const evaluate = buffer => {
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;

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

}

for (const opName of ["add", "subtract", "divide", "multiply"]) {
    document.querySelector(`.operator[data-op=${opName}]`).onclick = opCallback(opName);
};

document.querySelector('*[data-op="equals"]').onclick = () => {
    if (buffer && buffer.length) {
        buffer.push({ value: parseFloat($display.value)});
        $display.value = evaluate(buffer);
    }
}

document.querySelector('*[data-op="clear"]').onclick = () => {
    $display.value = 0;
    buffer.length = 0;
}

document.querySelector('*[data-op="neg"]').onclick = () => { 
    $display.value = -parseFloat($display.value);
}

document.querySelector('*[data-op="backspace"]').onclick = () => { 
    $display.value = $display.value.substr(0, $display.value.length - 1);
    if($display.value == "") {
        $display.value = "0";
        };
}
document.querySelector('*[data-op="decimal"]').onclick = () => { 
    if ($display.value.includes(".")) {
        alert("Too many decimals.");
        return;
        };
    updateDisplay(e.target.value); 
}




//FUNCTIONS --------------



insertDecimal = (e) => { 
    if (screen.value.includes(".")) {
        alert("Too many decimals.");
        return;
        };
    updateDisplay(e.target.value); 
};


backspace = () => {
    $display.value = $display.value.substr(0, $display.value.length - 1);
    if($display.value == "") {
        $display.value = "0";
        };
};


//EVENT LISTENERS / BUTTONS --------------



//KEYBOARD USAGE --------------




//END ----------------
return {
test: function() {
    console.log("hey");
}};

})();
//IIFE immediately invoked function
calc.test();