class Calculator {
  constructor(previousDisplay, currentDisplay) {
    //passing the arguments so that js knows where to place the text elements
    this.previousDisplay = previousDisplay; //specifiying the position and class to target
    this.currentDisplay = currentDisplay;
    this.clear();
  }

  clear() {
    //define two elements to address the previous and current display in the webpage
    this.previousDisplayText = ""; //initializing the previous display text and setting it to an empty string
    this.currentDisplayText = ""; //initializing the current display text and setting it to an empty string
    this.operation = undefined;
  }

  delete() {
    this.currentDisplayText = this.currentDisplayText.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentDisplayText.includes(".")) return;
    this.currentDisplayText =
      this.currentDisplayText.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentDisplayText === "") return;
    if (this.previousDisplayText !== "") {
      this.computeResult();
    }

    this.operation = operation;
    this.previousDisplayText = this.currentDisplayText;
    this.currentDisplayText = "";
  }

  computeResult() {
    let result;
    const prev = parseFloat(this.previousDisplayText);
    const current = parseFloat(this.currentDisplayText);
    //parseFloat converts the first element from string to float, else returns NaN

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "÷":
        result = prev / current;
        break;
      default:
        return;
    }
    this.currentDisplayText = result;
    this.operation = undefined;
    this.previousDisplayText = "";
  }

  displayNumber(number) {
    const numberString = number.toString();
    const integerHalf = parseFloat(numberString.split(".")[0]);
    const decimalHalf = numberString.split(".")[1];

    let integerDisplay;

    if (isNaN(integerHalf)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerHalf.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalHalf != null) {
      return `${integerDisplay}.${decimalHalf}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentDisplay.innerText = this.displayNumber(this.currentDisplayText);
    if (this.operation != null) {
      this.previousDisplay.innerText =
        this.displayNumber(this.previousDisplayText) + this.operation;
    } else {
      this.previousDisplay.innerText = "";
    }
  }
}

const numberClick = document.querySelectorAll("[data-number]");
const operationClick = document.querySelectorAll("[data-operation]");
const equalClick = document.querySelector("[data-equal]");
const deleteClick = document.querySelector("[data-delete]");
const allClear = document.querySelector("[data-all-clear]");
const previousDisplay = document.querySelector("[data-previous-display]");
const currentDisplay = document.querySelector("[data-current-display]");

//declaring the const that will allow us to use the calculator object
const calculator = new Calculator(previousDisplay, currentDisplay);

numberClick.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationClick.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalClick.addEventListener("click", (button) => {
  calculator.computeResult();
  calculator.updateDisplay();
});

allClear.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteClick.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
