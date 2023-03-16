const buttons = document.querySelectorAll(`button[data-btn]`);
const currentResult = document.querySelector("#currentResult");

const clear = document.querySelector("#clear");
const deleteResult = document.querySelector("#delete");

const modulo = document.querySelector("#modulo");
const add = document.querySelector("#sum");
const sub = document.querySelector("#difference");
const multiply = document.querySelector("#product");
const divide = document.querySelector("#quotient");
const calculate = document.querySelector("#calculate");

const calculator = {
    dataCollector: [],
    recentOperator: undefined,
    currentOperator: undefined
};

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (currentResult.textContent.includes('.') && e.target.dataset.btn === '.') return;
        currentResult.textContent += e.target.dataset.btn;
        checkIfEmpty();
    });
});

window.addEventListener("keydown", keyboard);

function keyboard(e) {
    const keyboard = document.querySelector(`button[data-key="${e.key}"]`);
    if (!keyboard) return;
    
    if (keyboard.dataset.key === '+') evaluateSum();
    if (keyboard.dataset.key === '-') evaluateDiff();
    if (keyboard.dataset.key === 'x') evaluateProduct();
    if (keyboard.dataset.key === '/') evaluateQuotient();
    if (keyboard.dataset.key === '%') evaluateModulo();
    if (keyboard.dataset.key === '=') evaluateResult();
    if (keyboard.dataset.key === 'Backspace') del();

    if (keyboard.dataset.key === '+' || keyboard.dataset.key === '-' || keyboard.dataset.key === 'x' || 
    keyboard.dataset.key === '/' || keyboard.dataset.key === '=' || 
    keyboard.dataset.key === '%' || keyboard.dataset.key === 'Backspace') {
        return;   
    } else {
        if (currentResult.textContent.includes('.') && keyboard.dataset.key === '.') return;
        currentResult.textContent += keyboard.dataset.key;
    }

    checkIfEmpty();
}

const pushDataToArray = function() {
    calculator.dataCollector.push(parseFloat(currentResult.textContent));
    while(currentResult.firstChild) {
        currentResult.removeChild(currentResult.lastChild);
    }
}

clear.addEventListener('click', clearResult);
deleteResult.addEventListener('click', del);

add.addEventListener('click', evaluateSum);

sub.addEventListener('click', evaluateDiff);

multiply.addEventListener('click', evaluateProduct);

divide.addEventListener('click', evaluateQuotient);

modulo.addEventListener('click', evaluateModulo);

calculate.addEventListener('click', evaluateResult);

function clearResult() {
    while(currentResult.firstChild) {
        currentResult.removeChild(currentResult.lastChild);
    }

    while(calculator.dataCollector.length > 0) {
        calculator.dataCollector.shift();
    }

    calculator.currentOperator = undefined;
    calculator.recentOperator = undefined;
    checkIfEmpty();
}

function del() {
    if (currentResult.textContent.length == 0) return;
    currentResult.textContent = currentResult.textContent.slice(0, -1);
    checkIfEmpty();
}

function sum() {
    calculator.dataCollector.reduce((x, y) => {
        calculator.dataCollector.push(x + y);
    });

    removeDataFromArray();
}

function difference() {
    calculator.dataCollector.reduce((x, y) => {
        calculator.dataCollector.push(x - y);
    });

    removeDataFromArray();
}

function product() {
    calculator.dataCollector.reduce((x, y) => {
        calculator.dataCollector.push(x * y);
    });

    removeDataFromArray();
}

function quotient() {
    calculator.dataCollector.reduce((x, y) => {
        calculator.dataCollector.push(x / y);
    });

    removeDataFromArray();
}

function mod() {
    calculator.dataCollector.reduce((x, y) => {
        calculator.dataCollector.push(x % y);
    });

    removeDataFromArray();
}

function calculateData() {
    currentResult.textContent = calculator.dataCollector[calculator.dataCollector.length - 1];
    calculator.dataCollector.shift();
}

function removeDataFromArray() {
    while(calculator.dataCollector.length >= 2) {
        calculator.dataCollector.shift();
    }
}

function evaluateSum() {
    if (calculator.currentOperator === 'minus') calculator.recentOperator = 'minus';
    if (calculator.currentOperator === 'times') calculator.recentOperator = 'times';
    if (calculator.currentOperator === 'divide') calculator.recentOperator = 'divide';
    if (calculator.currentOperator === 'modulo') calculator.recentOperator = 'modulo';
    calculator.currentOperator = 'plus';
    pushDataToArray();

    if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'plus' && calculator.recentOperator === undefined) {
        sum();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'plus' && calculator.recentOperator === 'minus') {
        calculator.recentOperator = undefined;
        difference();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'plus' && calculator.recentOperator === 'times') {
        calculator.recentOperator = undefined;
        product();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'plus' && calculator.recentOperator === 'divide') {
        calculator.recentOperator = undefined;
        quotient();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'plus' && calculator.recentOperator === 'modulo') {
        calculator.recentOperator = undefined;
        mod();
    }

    checkIfEmpty();
}

function evaluateDiff() {
    if (calculator.currentOperator === 'plus') calculator.recentOperator = 'plus';
    if (calculator.currentOperator === 'times') calculator.recentOperator = 'times';
    if (calculator.currentOperator === 'divide') calculator.recentOperator = 'divide';
    if (calculator.currentOperator === 'modulo') calculator.recentOperator = 'modulo';
    calculator.currentOperator = 'minus';
    pushDataToArray();

    if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'minus' && calculator.recentOperator === undefined) {
        difference();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'minus' && calculator.recentOperator === 'plus') {
        calculator.recentOperator = undefined;
        sum();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'minus' && calculator.recentOperator === 'times') {
        calculator.recentOperator = undefined;
        product();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'minus' && calculator.recentOperator === 'divide') {
        calculator.recentOperator = undefined;
        quotient();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'minus' && calculator.recentOperator === 'modulo') {
        calculator.recentOperator = undefined;
        mod();
    }

    checkIfEmpty();
}

function evaluateProduct() {
    if (calculator.currentOperator === 'plus') calculator.recentOperator = 'plus';
    if (calculator.currentOperator === 'minus') calculator.recentOperator = 'minus';
    if (calculator.currentOperator === 'divide') calculator.recentOperator = 'divide';
    if (calculator.currentOperator === 'modulo') calculator.recentOperator = 'modulo';
    calculator.currentOperator = 'times';
    pushDataToArray();

    if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'times' && calculator.recentOperator === undefined) {
        product();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'times' && calculator.recentOperator === 'plus') {
        calculator.recentOperator = undefined;
        sum();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'times' && calculator.recentOperator === 'minus') {
        calculator.recentOperator = undefined;
        difference();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'times' && calculator.recentOperator === 'divide') {
        calculator.recentOperator = undefined;
        quotient();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'times' && calculator.recentOperator === 'modulo') {
        calculator.recentOperator = undefined;
        mod();
    }

    checkIfEmpty();
}

function evaluateQuotient() {
    if (calculator.currentOperator === 'plus') calculator.recentOperator = 'plus';
    if (calculator.currentOperator === 'minus') calculator.recentOperator = 'minus';
    if (calculator.currentOperator === 'times') calculator.recentOperator = 'times';
    if (calculator.currentOperator === 'modulo') calculator.recentOperator = 'modulo';
    calculator.currentOperator = 'divide';
    pushDataToArray();

    if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'divide' && calculator.recentOperator === undefined) {
        quotient();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'divide' && calculator.recentOperator === 'plus') {
        calculator.recentOperator = undefined;
        sum();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'divide' && calculator.recentOperator === 'minus') {
        calculator.recentOperator = undefined;
        difference();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'divide' && calculator.recentOperator === 'times') {
        calculator.recentOperator = undefined;
        product();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'divide' && calculator.recentOperator === 'modulo') {
        calculator.recentOperator = undefined;
        mod();
    }

    checkIfEmpty();
}

function evaluateModulo() {
    if (calculator.currentOperator === 'plus') calculator.recentOperator = 'plus';
    if (calculator.currentOperator === 'minus') calculator.recentOperator = 'minus';
    if (calculator.currentOperator === 'times') calculator.recentOperator = 'times';
    if (calculator.currentOperator === 'divide') calculator.recentOperator = 'divide';
    calculator.currentOperator = 'modulo';
    pushDataToArray();

    if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'modulo' && calculator.recentOperator === undefined) {
        mod();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'modulo' && calculator.recentOperator === 'plus') {
        calculator.recentOperator = undefined;
        sum();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'modulo' && calculator.recentOperator === 'minus') {
        calculator.recentOperator = undefined;
        difference();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'modulo' && calculator.recentOperator === 'times') {
        calculator.recentOperator = undefined;
        product();
    } else if (calculator.dataCollector.length == 2 && calculator.currentOperator === 'modulo' && calculator.recentOperator === 'divide') {
        calculator.recentOperator = undefined;
        quotient();
    }

    checkIfEmpty();
}

function evaluateResult() {
    if(calculator.dataCollector.length == 0) {
        alert("Please add some number with operational buttons before hitting me");
        return;
    } else {
        if (currentResult.textContent.length === 0) return;
        pushDataToArray();
        if(calculator.currentOperator === 'plus') sum();
        if(calculator.currentOperator === 'minus') difference();
        if(calculator.currentOperator === 'times') product();
        if(calculator.currentOperator === 'divide') quotient();
        if(calculator.currentOperator === 'modulo') mod();
        removeDataFromArray();
        calculateData();
        checkIfEmpty();
    }
}

function disableOperationalBtns() {
    add.disabled = true;
    add.style['pointerEvents'] = 'none';
    sub.disabled = true;
    sub.style['pointerEvents'] = 'none';
    multiply.disabled = true;
    multiply.style['pointerEvents'] = 'none';
    divide.disabled = true;
    divide.style['pointerEvents'] = 'none';
    modulo.disabled = true;
    modulo.style['pointerEvents'] = 'none';
}

function enableOperationalBtns() {
    add.disabled = false;
    add.style['pointerEvents'] = '';
    sub.disabled = false;
    sub.style['pointerEvents'] = '';
    multiply.disabled = false;
    multiply.style['pointerEvents'] = '';
    divide.disabled = false;
    divide.style['pointerEvents'] = '';
    modulo.disabled = false;
    modulo.style['pointerEvents'] = '';
}

function checkIfEmpty() {
    if (currentResult.textContent.length === 0) {
        disableOperationalBtns();
    } else {
        enableOperationalBtns();
    }
}

checkIfEmpty();