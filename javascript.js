const display = document.querySelector('.display');
const clearButton = document.querySelector('.clear');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');
const zeroButton = document.querySelector('.zero');

let currentOperand = '';
let previousOperand = '';
let currentOperator = null;
let shouldResetDisplay = false;

function clear() {
  display.value = '';
  currentOperand = '';
  previousOperand = '';
  currentOperator = null;
}

function appendNumber(number) {
  if (shouldResetDisplay) {
    display.value = '';
    shouldResetDisplay = false;
  }
  display.value += number;
  currentOperand += number;
}

function chooseOperator(operator) {
  if (currentOperand === '') return;
  if (previousOperand !== '') evaluate();
  currentOperator = operator;
  previousOperand = currentOperand;
  currentOperand = '';
}

function evaluate() {
  if (currentOperand === '') return;
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(previous) || isNaN(current)) return;
  let result = null;
  switch (currentOperator) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '*':
      result = previous * current;
      break;
    case '/':
      result = previous / current;
      break;
    default:
      return;
  }
  shouldResetDisplay = true;
  display.value = result.toFixed(2);
  currentOperand = result.toString();
  currentOperator = null;
  previousOperand = '';
}

clearButton.addEventListener('click', clear);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.textContent);
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperator(button.textContent);
  });
});

equalButton.addEventListener('click', evaluate);

zeroButton.addEventListener('click', () => {
  if (shouldResetDisplay) {
    display.value = '';
    shouldResetDisplay = false;
  }
  if (display.value !== '0') {
    display.value += '0';
    currentOperand += '0';
  }
});
