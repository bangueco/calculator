const buttons = document.querySelectorAll(`button[data-btn]`);
const currentResult = document.querySelector("#currentResult");

const add = document.querySelector("#sum");
const sub = document.querySelector("#difference");
const multiply = document.querySelector("#product");
const divide = document.querySelector("#quotient");
const calculate = document.querySelector("#calculate");

const dataCollector = [];

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (!e.target.dataset.btn) return;
        currentResult.textContent += e.target.dataset.btn;
    });
});

let enableAddingNumbers = false;
let enableSubtractingNumbers = false;
let enableMultiplyingNumbers = false;
let enableDividingNumbers = false;

add.addEventListener('click', () => operator('add'));
sub.addEventListener('click', () => operator('sub'));
multiply.addEventListener('click', () => operator('multiply'));
divide.addEventListener('click', () => operator('divide'));
calculate.addEventListener('click', () => {
    dataCollector.push(parseInt(currentResult.textContent));
    while(currentResult.firstChild) {
        currentResult.removeChild(currentResult.lastChild);
    };

    if (enableAddingNumbers === true) {
        calculateValues('sum');
        enableAddingNumbers = false;
    } else if (enableSubtractingNumbers === true) {
        calculateValues('difference');
        enableSubtractingNumbers = false;
    } else if (enableMultiplyingNumbers = true) {
        calculateValues('product');
        enableMultiplyingNumbers = false;
    } else if (enableDividingNumbers = true) {
        calculateValues('quotient');
        enableDividingNumbers = false;
    }
});

function operator(operator) {
    if (operator === 'add' || operator === 'sub' || operator === 'multiply' || operator === 'divide') {
        dataCollector.push(parseInt(currentResult.textContent));
        while(currentResult.firstChild) {
            currentResult.removeChild(currentResult.lastChild);
        }
    }

    if (operator === 'add') enableAddingNumbers = true;
    if (operator === 'sub') enableSubtractingNumbers = true;
    if (operator === 'multiply') enableMultiplyingNumbers = true;
    if (operator === 'divide') enableDividingNumbers = true;
}

function calculateValues(operator) {
    if (operator === 'sum') {
        dataCollector.reduce((num1, num2) => {
            let total = num1 + num2;
            currentResult.textContent = total;
        });
    } else if (operator === 'difference') {
        dataCollector.reduce((num1, num2) => {
            let total = num1 - num2;
            currentResult.textContent = total;
        });
    } else if (operator === 'product') {
        dataCollector.reduce((num1, num2) => {
            let total = num1 * num2;
            currentResult.textContent = total;
        });
    } else if (operator === 'quotient') {
        dataCollector.reduce((num1, num2) => {
            let total = num1 / num2;
            currentResult.textContent = total;
        });
    }
}