const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn[data-value]');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let currentInput = '0';

function updateDisplay() {
  display.value = currentInput;
}

function appendValue(value) {
  if (currentInput === '0' && value !== '.') {
    currentInput = value;
  } else {
    currentInput += value;
  }

  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  updateDisplay();
}

function calculateResult() {
  try {
    const sanitizedInput = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
    const result = Function(`"use strict"; return (${sanitizedInput})`)();

    if (!Number.isFinite(result)) {
      currentInput = 'Error';
    } else {
      currentInput = String(result);
    }
  } catch {
    currentInput = 'Error';
  }

  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (currentInput === 'Error') {
      currentInput = '0';
    }

    const { value } = button.dataset;

    if (value === '.' && /\.[^+\-*/]*$/.test(currentInput)) {
      return;
    }

    appendValue(value);
  });
});

clearButton.addEventListener('click', clearDisplay);
equalsButton.addEventListener('click', calculateResult);
