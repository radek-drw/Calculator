const numbers = document.querySelectorAll('.buttons__number');
const operators = document.querySelectorAll('.buttons__operator');
const clear = document.querySelector('.buttons__clear');
const backspace = document.querySelector('.buttons__backspace');
const equal = document.querySelector('.buttons__equal');
const previousResult = document.querySelector('.previous-action');
const currentResult = document.querySelector('.current-action');

let currentOperation = '';
let previousOperation = '';
let operation = undefined;

const calculate = () => {
   let action;
   if (!previousOperation || !currentOperation) {
      return;
   }

   const previous = parseFloat(previousOperation);
   const current = parseFloat(currentOperation);

   if (isNaN(previous) || isNaN(current)) {
      return;
   }

   switch (operation) {
      case '+':
         action = previous + current;
         break;

      case '-':
         action = previous - current;
         break;
      case '×':
         action = previous * current;
         break;
      case '÷':
         if (current === 0) {
            clearResult();
            return;
         }
         action = previous / current;
         break;
      default:
         return;
   }
   currentOperation = action;
   operation = undefined;
   previousOperation = '';
};

const chooseOperation = operator => {
   if (currentOperation === '') {
      return;
   }
   if (previousOperation !== '') {
      const previous = previousResult.textContent;
      if (currentOperation.toString() === '0' && previous[previous.length - 1] === '+') {
         clearResult();
         return;
      }
      calculate();
   }
   operation = operator;
   previousOperation = currentOperation;
   currentOperation = '';
};

const updateResult = () => {
   currentResult.textContent = currentOperation;
   if (operation != null) {
      previousResult.textContent = previousOperation + operation;
   } else {
      previousResult.textContent = '';
   }
};

const addNumber = number => {
   if (number == '.') {
      if (currentOperation.includes('.')) {
         return;
      }
      number = '.';
   }
   currentOperation = currentOperation.toString() + number.toString();
};

const removeNumber = () => {
   currentOperation = currentOperation.toString().slice(0, -1);
};

const clearResult = () => {
   currentOperation = '';
   previousOperation = '';
   operation = undefined;
};

numbers.forEach(number => {
   number.addEventListener('click', () => {
      addNumber(number.textContent);
      updateResult();
   });
});

backspace.addEventListener('click', () => {
   removeNumber();
   updateResult();
});

operators.forEach(operator => {
   operator.addEventListener('click', () => {
      chooseOperation(operator.textContent);
      updateResult();
   });
});

equal.addEventListener('click', () => {
   calculate();
   updateResult();
});

clear.addEventListener('click', () => {
   clearResult();
   updateResult();
});