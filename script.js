const calc = (function(){

const $display = document.querySelector(".display");

const buffer = [];
let opPressed = false;

document.querySelectorAll(".numbers").forEach(
    element => {
        element.onclick = () => {
    if(opPressed) {
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
        buffer.push({ value: parseFloat($display.innerText)});
        $display.innerText = evaluate(buffer);
    }
}

document.querySelector('*[data-op="clear"]').onclick = () => {
    $display.innerText = 0;
    buffer.length = 0;
}

document.querySelector('*[data-op="neg"]').onclick = () => { 
    $display.innerText = -parseFloat($display.innerText);
}

document.querySelector('*[data-op="backspace"]').onclick = () => { 
    $display.innerText = $display.innerText.substr(0, $display.innerText.length - 1);
    if($display.innerText == "") {
        $display.innerText = "0";
        };
}


document.querySelector("#decimalbtn").onclick = () => { 
    $display.innerText = $display.innerText.includes(".") ? 
    $display.innerText : $display.innerText + ".";
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