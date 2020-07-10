const calc = (function(){

const $display = document.querySelector(".display");

const buffer = [];
let opPressed = false;

document.querySelectorAll(".numbers").forEach(
    element => {
        element.onclick = () => {
    if(opPressed) {
        $display.value = element.innerText;
        opPressed = false;
        console.log("test1");
    } else if ($display.value === "0") {
        $display.value = element.innerText;
        console.log("test2");
    } else if ($display.value !== "0") {
        $display.value = $display.value + element.innerText;
        console.log("test3");
    }
}});

const opCallback = opName => () => {
    let currentVal = parseFloat($display.value);
    
    if (buffer && buffer.length) {
        opPressed = true;
        buffer.push({ value: currentVal });

        const result = evaluate(buffer);
        buffer.push({ value: result });
        buffer.push({ value: opName });

        $display.value = buffer[0].value;
    } else {
        opPressed = true;
        buffer.push({ value: currentVal });
        buffer.push({ value: opName });

        $display.value = buffer[0].value;
    }
}

for (const opName of ["add", "subtract", "divide", "multiply"]) {
    document.querySelector(`.operator[data-op=${opName}]`).onclick = opCallback(opName);
};

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


document.querySelector("#decimalbtn").onclick = () => { 
    $display.value = $display.value.includes(".") ? 
    $display.value : $display.value + ".";
}


//KEYBOARD USAGE --------------




//END ----------------
return {
test: function() {
    console.log("hey");
}};

})();
//IIFE immediately invoked function
calc.test();