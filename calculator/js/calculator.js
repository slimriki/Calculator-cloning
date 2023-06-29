const calculator = {
    display: '0',
    firstOperator: null,
    secondOperator: false,
    operator: null,
  };
  
  function inputDigit(digit) {
    const {  display, secondOperator } = calculator;
  
    if (secondOperator === true) {
      calculator. display = digit;
      calculator.secondOperator = false;
    } else {
      calculator. display =  display === '0' ? digit :  display + digit;
    }
  }
  
  function inputDecimal(dot) {
    if (calculator.secondOperator === true) {
        calculator. display = "0."
      calculator.secondOperator = false;
      return
    }
  
    if (!calculator. display.includes(this.dot)) {
      calculator. display += dot;
    }
  }
  
  function handleOperator(nextOperator) {
    const {  firstOperator,  display, operator } = calculator
    const inputValue = parseFloat( display);
    
    if (operator && calculator.secondOperator)  {
      calculator.operator = nextOperator;
      return;
    }
  
  
    if ( firstOperator == null && !isNaN(inputValue)) {
      calculator. firstOperator = inputValue;
    } else if (operator) {
      const result = calculate( firstOperator, inputValue, operator);
  
      calculator. display = `${parseFloat(result.toFixed(7))}`;
      calculator. firstOperator = result;
    }
  
    calculator.secondOperator = true;
    calculator.operator = nextOperator;
  }
  
  function calculate( firstOperator, secondOperand, operator) {
    if (operator === '+') {
      return  firstOperator + secondOperand;
    } else if (operator === '-') {
      return  firstOperator - secondOperand;
    } else if (operator === '*') {
      return  firstOperator * secondOperand;
    } else if (operator === '/') {
      return  firstOperator / secondOperand;
    }
  
    return secondOperand;
  }
  
  function resetCalculator() {
    calculator. display = '0';
    calculator. firstOperator = null;
    calculator.secondOperator = false;
    calculator.operator = null;
  }
  
  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator. display;
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
      return;
    }
  
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleOperator(value);
        break;
      case '.':
        inputDecimal(value);
        break;
      case 'all-clear':
        resetCalculator();
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }
  
    updateDisplay();
  });