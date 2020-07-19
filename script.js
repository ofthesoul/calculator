const buffer = [];

const calc = (function () {
  let $display = document.querySelector(".display");
  let opPressed = false;
  let equalPressed = false;
  let deciPressed = false;

  document.querySelectorAll(".numbers").forEach((element) => {
    element.onclick = () => {
      console.log($display.innerText);
      if (
        element.id === "decimalbtn" &&
        $display.innerText.includes(".") &&
        !equalPressed
      ) {
        $display.innerText = element.innerText;
        opPressed = false;
      } else if (element.id === "decimalbtn" && equalPressed) {
        clear();
        $display.innerText = element.innerText;
        equalPressed = false;
      } else if (element.id === "decimalbtn" && opPressed) {
        $display.innerText = element.innerText;
        opPressed = false;
      } else if (element.id === "decimalbtn") {
        if ($display.innerText === "0") {
          $display.innerText = ".";
        } else {
          $display.innerText = $display.innerText + ".";
        }
      } else if (opPressed) {
        $display.innerText = element.innerText;
        opPressed = false;
      } else if (equalPressed) {
        clear();
        $display.innerText = element.innerText;
        equalPressed = false;
      } else if ($display.innerText === "0") {
        $display.innerText = element.innerText;
      } else if ($display.innerText !== "0") {
        $display.innerText = $display.innerText + element.innerText;
      }
    };
  });

  const opCallback = (opName) => () => {
    equalPressed = false;
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
    document.querySelector(`.operator[data-op=${opName}]`).onclick = opCallback(
      opName
    );
  }

  let equalsInARow = "";
  const equalsThreshold = 0;

  let firstOperand = 0;
  let secondOperand = 0;
  let operator = "";

  let lastRunCalculation = {
    operator: "",
    firstOperand: 0,
    secondOperand: 0,
  };

  const evaluate = (buffer) => {
    if (equalsInARow > equalsThreshold) {
      secondOperand = lastRunCalculation.secondOperand;
      operator = lastRunCalculation.operator;
      firstOperand = lastRunCalculation.firstOperand;
    } else {
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
      buffer.push({ value: parseFloat($display.innerText) });
      $display.innerText = evaluate(buffer);
      equalsInARow++;
      console.log("equals ran");
    } else if (buffer.length == 0 && lastRunCalculation.operator != "") {
      console.log("equals2 ran");
      let displayText = parseInt($display.innerText);
      lastRunCalculation.firstOperand = parseFloat($display.innerText);
      $display.innerText = evaluate(displayText);
      equalsInARow++;
    }
    equalPressed = true;
  };

  const clear = () => {
    $display.innerText = 0;
    buffer.length = 0;
    equalsInARow = "";
    firstOperand = 0;
    secondOperand = 0;
    operator = "";
    lastRunCalculation = {
      operator: "",
      firstOperand: 0,
      secondOperand: 0,
    };
  };

  document.querySelector('*[data-op="clear"]').onclick = () => {
    clear();
  };

  document.querySelector('*[data-op="neg"]').onclick = () => {
    $display.innerText = -parseFloat($display.innerText);
  };

  document.querySelector('*[data-op="backspace"]').onclick = () => {
    $display.innerText = $display.innerText.substr(
      0,
      $display.innerText.length - 1
    );
    if ($display.innerText == "") {
      $display.innerText = "0";
    }
    equalPressed = false;
  };

  //KEYBOARD USAGE --------------

  //END ----------------
  return {
    test: function () {
      console.log("hey");
    },
  };
})();
//IIFE immediately invoked function
calc.test();
