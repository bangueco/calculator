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

const dataCollector = [];
let recentOperator = undefined, currentOperator = undefined;

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (!e.target.dataset.btn) return;
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
        currentResult.textContent += keyboard.dataset.key;
    }

    checkIfEmpty();
}

const pushDataToArray = function() {
    dataCollector.push(parseFloat(currentResult.textContent));
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

    while(dataCollector.length > 0) {
        dataCollector.shift();
    }

    currentOperator = undefined;
    recentOperator = undefined;
    checkIfEmpty();
}

function del() {
    if (currentResult.textContent.length == 0) return;
    currentResult.textContent = currentResult.textContent.slice(0, -1);
    checkIfEmpty();
}

function sum() {
    dataCollector.reduce((x, y) => {
        dataCollector.push(x + y);
    });

    removeDataFromArray();
}

function difference() {
    dataCollector.reduce((x, y) => {
        dataCollector.push(x - y);
    });

    removeDataFromArray();
}

function product() {
    dataCollector.reduce((x, y) => {
        dataCollector.push(x * y);
    });

    removeDataFromArray();
}

function quotient() {
    dataCollector.reduce((x, y) => {
        dataCollector.push(x / y);
    });

    removeDataFromArray();
}

function mod() {
    dataCollector.reduce((x, y) => {
        dataCollector.push(x % y);
    });

    removeDataFromArray();
}

function calculateData() {
    currentResult.textContent = dataCollector[dataCollector.length - 1];
    dataCollector.shift();
}

function removeDataFromArray() {
    while(dataCollector.length >= 2) {
        dataCollector.shift();
    }
}

function evaluateSum() {
    if (currentOperator === 'minus') recentOperator = 'minus';
    if (currentOperator === 'times') recentOperator = 'times';
    if (currentOperator === 'divide') recentOperator = 'divide';
    if (currentOperator === 'modulo') recentOperator = 'modulo';
    currentOperator = 'plus';
    pushDataToArray();

    if (dataCollector.length == 2 && currentOperator === 'plus' && recentOperator === undefined) {
        sum();
    } else if (dataCollector.length == 2 && currentOperator === 'plus' && recentOperator === 'minus') {
        recentOperator = undefined;
        difference();
    } else if (dataCollector.length == 2 && currentOperator === 'plus' && recentOperator === 'times') {
        recentOperator = undefined;
        product();
    } else if (dataCollector.length == 2 && currentOperator === 'plus' && recentOperator === 'divide') {
        recentOperator = undefined;
        quotient();
    } else if (dataCollector.length == 2 && currentOperator === 'plus' && recentOperator === 'modulo') {
        recentOperator = undefined;
        mod();
    }

    checkIfEmpty();
}

function evaluateDiff() {
    if (currentOperator === 'plus') recentOperator = 'plus';
    if (currentOperator === 'times') recentOperator = 'times';
    if (currentOperator === 'divide') recentOperator = 'divide';
    if (currentOperator === 'modulo') recentOperator = 'modulo';
    currentOperator = 'minus';
    pushDataToArray();

    if (dataCollector.length == 2 && currentOperator === 'minus' && recentOperator === undefined) {
        difference();
    } else if (dataCollector.length == 2 && currentOperator === 'minus' && recentOperator === 'plus') {
        recentOperator = undefined;
        sum();
    } else if (dataCollector.length == 2 && currentOperator === 'minus' && recentOperator === 'times') {
        recentOperator = undefined;
        product();
    } else if (dataCollector.length == 2 && currentOperator === 'minus' && recentOperator === 'divide') {
        recentOperator = undefined;
        quotient();
    } else if (dataCollector.length == 2 && currentOperator === 'minus' && recentOperator === 'modulo') {
        recentOperator = undefined;
        mod();
    }

    checkIfEmpty();
}

function evaluateProduct() {
    if (currentOperator === 'plus') recentOperator = 'plus';
    if (currentOperator === 'minus') recentOperator = 'minus';
    if (currentOperator === 'divide') recentOperator = 'divide';
    if (currentOperator === 'modulo') recentOperator = 'modulo';
    currentOperator = 'times';
    pushDataToArray();

    if (dataCollector.length == 2 && currentOperator === 'times' && recentOperator === undefined) {
        product();
    } else if (dataCollector.length == 2 && currentOperator === 'times' && recentOperator === 'plus') {
        recentOperator = undefined;
        sum();
    } else if (dataCollector.length == 2 && currentOperator === 'times' && recentOperator === 'minus') {
        recentOperator = undefined;
        difference();
    } else if (dataCollector.length == 2 && currentOperator === 'times' && recentOperator === 'divide') {
        recentOperator = undefined;
        quotient();
    } else if (dataCollector.length == 2 && currentOperator === 'times' && recentOperator === 'modulo') {
        recentOperator = undefined;
        mod();
    }

    checkIfEmpty();
}

function evaluateQuotient() {
    if (currentOperator === 'plus') recentOperator = 'plus';
    if (currentOperator === 'minus') recentOperator = 'minus';
    if (currentOperator === 'times') recentOperator = 'times';
    if (currentOperator === 'modulo') recentOperator = 'modulo';
    currentOperator = 'divide';
    pushDataToArray();

    if (dataCollector.length == 2 && currentOperator === 'divide' && recentOperator === undefined) {
        quotient();
    } else if (dataCollector.length == 2 && currentOperator === 'divide' && recentOperator === 'plus') {
        recentOperator = undefined;
        sum();
    } else if (dataCollector.length == 2 && currentOperator === 'divide' && recentOperator === 'minus') {
        recentOperator = undefined;
        difference();
    } else if (dataCollector.length == 2 && currentOperator === 'divide' && recentOperator === 'times') {
        recentOperator = undefined;
        product();
    } else if (dataCollector.length == 2 && currentOperator === 'divide' && recentOperator === 'modulo') {
        recentOperator = undefined;
        mod();
    }

    checkIfEmpty();
}

function evaluateModulo() {
    if (currentOperator === 'plus') recentOperator = 'plus';
    if (currentOperator === 'minus') recentOperator = 'minus';
    if (currentOperator === 'times') recentOperator = 'times';
    if (currentOperator === 'divide') recentOperator = 'divide';
    currentOperator = 'modulo';
    pushDataToArray();

    if (dataCollector.length == 2 && currentOperator === 'modulo' && recentOperator === undefined) {
        mod();
    } else if (dataCollector.length == 2 && currentOperator === 'modulo' && recentOperator === 'plus') {
        recentOperator = undefined;
        sum();
    } else if (dataCollector.length == 2 && currentOperator === 'modulo' && recentOperator === 'minus') {
        recentOperator = undefined;
        difference();
    } else if (dataCollector.length == 2 && currentOperator === 'modulo' && recentOperator === 'times') {
        recentOperator = undefined;
        product();
    } else if (dataCollector.length == 2 && currentOperator === 'modulo' && recentOperator === 'divide') {
        recentOperator = undefined;
        quotient();
    }

    checkIfEmpty();
}

function evaluateResult() {
    if(dataCollector.length == 0) {
        alert("Please add some number with operational buttons before hitting me");
        return;
    } else {
        if (currentResult.textContent.length === 0) return;
        pushDataToArray();
        if(currentOperator === 'plus') sum();
        if(currentOperator === 'minus') difference();
        if(currentOperator === 'times') product();
        if(currentOperator === 'divide') quotient();
        if(currentOperator === 'modulo') mod();
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