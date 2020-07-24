const calc = (function () {
  const buffer = []; //holds equation and operator

  let $display = document.querySelector(".display");
  let opPressed = false;
  let equalPressed = false;

  //  HANDLING INPUTS ----------------------

  inputNumbers = (element) => {
    if (
      element.id === ".btn" &&
      $display.innerText.includes(".") &&
      !equalPressed
    ) {
      $display.innerText = element.innerText;
      opPressed = false;
    } else if (element.id === ".btn" && equalPressed) {
      clear();
      $display.innerText = element.innerText;
      equalPressed = false;
    } else if (element.id === ".btn" && opPressed) {
      $display.innerText = element.innerText;
      opPressed = false;
    } else if (element.id === ".btn") {
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

  document.querySelectorAll(".numbers").forEach((element) => {
    element.onclick = () => {
      inputNumbers(element);
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
  // CALCULATING RESULTS ------------------------------

  let equalsInARow = "";
  const equalsThreshold = 0;
  let firstOperand = 0;
  let secondOperand = 0;
  let operator = "";
  let toRound = "";
  let lastRunCalculation = {
    operator: "",
    firstOperand: 0,
    secondOperand: 0,
  };

  const roundResult = (toRound) => {
    let rounded = toRound.toFixed(4);
    return parseFloat(rounded);
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
        toRound = firstOperand + secondOperand;
        return roundResult(toRound);
        break;
      case "subtract":
        toRound = firstOperand - secondOperand;
        return roundResult(toRound);
        break;
      case "multiply":
        toRound = firstOperand * secondOperand;
        return roundResult(toRound);
        break;
      case "divide":
        toRound = firstOperand / secondOperand;
        return roundResult(toRound);
        break;
      default:
        return secondOperand;
    }
  };

  document.querySelector('*[data-op="equals"]').onclick = () => {
    if (buffer && buffer.length) {
      buffer.push({ value: parseFloat($display.innerText) });
      $display.innerText = evaluate(buffer);
      equalsInARow++;
    } else if (buffer.length == 0 && lastRunCalculation.operator != "") {
      let displayText = parseInt($display.innerText);
      lastRunCalculation.firstOperand = parseFloat($display.innerText);
      $display.innerText = evaluate(displayText);
      equalsInARow++;
    }
    equalPressed = true;
  };

  // BUTTON FUNCTIONS -----------------------------

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

  const backspace = () => {
    $display.innerText = $display.innerText.substr(
      0,
      $display.innerText.length - 1
    );
    if ($display.innerText == "") {
      $display.innerText = "0";
    }
    equalPressed = false;
  };

  document.querySelector('*[data-op="clear"]').onclick = () => {
    clear();
  };

  document.querySelector('*[data-op="neg"]').onclick = () => {
    $display.innerText = -parseFloat($display.innerText);
  };

  document.querySelector('*[data-op="backspace"]').onclick = () => {
    backspace();
  };

  //KEYBOARD USAGE ----------------------------

  document.addEventListener("keydown", (e) => {
    if (e.key == "." || (e.key >= 0 && e.key <= 9)) {
      event.preventDefault();
      document.getElementById(e.key + "btn").click();
    } else if (e.key == "+") {
      event.preventDefault();
      document.querySelector('*[data-op="add"]').click();
    } else if (e.key == "-") {
      event.preventDefault();
      document.querySelector('*[data-op="subtract"]').click();
    } else if (e.key == "/") {
      event.preventDefault();
      document.querySelector('*[data-op="divide"]').click();
    } else if (e.key == "*") {
      event.preventDefault();
      document.querySelector('*[data-op="multiply"]').click();
    } else if (e.key == "Enter" || e.key == "=") {
      event.preventDefault();
      document.getElementById("equalsignbtn").click();
    } else if (e.key == "Backspace") {
      backspace();
    } else if (e.key == "Delete" || e.key == "Escape") {
      clear();
    }
  });
})();
