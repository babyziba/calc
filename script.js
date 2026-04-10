var screen = document.getElementById("screen");
var buttons = document.querySelector(".calculator-buttons");

var firstNumber = "0";
var secondNumber = null;
var currentOperator = null;
var waitingForSecondNumber = false;

function updateScreen(value) {
  screen.textContent = value;
}

function addNumber(number) {
  if (waitingForSecondNumber) {
    secondNumber = number;
    updateScreen(secondNumber);
    waitingForSecondNumber = false;
    return;
  }

  if (currentOperator === null) {
    if (firstNumber === "0") {
      firstNumber = number;
    } else {
      firstNumber += number;
    }
    updateScreen(firstNumber);
  } else {
    if (secondNumber === null || secondNumber === "0") {
      secondNumber = number;
    } else {
      secondNumber += number;
    }
    updateScreen(secondNumber);
  }
}

function chooseOperator(operator) {
  if (currentOperator !== null && secondNumber !== null) {
    calculateResult();
  }

  currentOperator = operator;
  waitingForSecondNumber = true;
}

function clearCalculator() {
  firstNumber = "0";
  secondNumber = null;
  currentOperator = null;
  waitingForSecondNumber = false;
  updateScreen(firstNumber);
}

function backspaceNumber() {
  if (waitingForSecondNumber) {
    return;
  }

  if (currentOperator === null) {
    if (firstNumber.length > 1) {
      firstNumber = firstNumber.slice(0, -1);
    } else {
      firstNumber = "0";
    }
    updateScreen(firstNumber);
  } else {
    if (secondNumber === null) {
      return;
    }

    if (secondNumber.length > 1) {
      secondNumber = secondNumber.slice(0, -1);
    } else {
      secondNumber = null;
      updateScreen(firstNumber);
      return;
    }
    updateScreen(secondNumber);
  }
}

function doMath(num1, num2, operator) {
  if (operator === "+") {
    return num1 + num2;
  }
  if (operator === "-") {
    return num1 - num2;
  }
  if (operator === "*") {
    return num1 * num2;
  }
  if (operator === "/") {
    if (num2 === 0) {
      return "Error";
    }
    return num1 / num2;
  }
}

function calculateResult() {
  if (currentOperator === null || secondNumber === null) {
    return;
  }

  var result = doMath(Number(firstNumber), Number(secondNumber), currentOperator);

  if (result === "Error") {
    updateScreen(result);
    firstNumber = "0";
    secondNumber = null;
    currentOperator = null;
    waitingForSecondNumber = false;
    return;
  }

  firstNumber = String(result);
  secondNumber = null;
  currentOperator = null;
  waitingForSecondNumber = false;
  updateScreen(firstNumber);
}

buttons.addEventListener("click", function (event) {
  var target = event.target;

  if (!target.matches("button")) {
    return;
  }

  if (target.dataset.number !== undefined) {
    addNumber(target.dataset.number);
    return;
  }

  if (target.dataset.action === "operator") {
    chooseOperator(target.dataset.operator);
    return;
  }

  if (target.dataset.action === "equals") {
    calculateResult();
    return;
  }

  if (target.dataset.action === "clear") {
    clearCalculator();
    return;
  }

  if (target.dataset.action === "backspace") {
    backspaceNumber();
  }
});
