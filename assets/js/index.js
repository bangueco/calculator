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
let recentOperator, currentOperator;

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (!e.target.dataset.btn) return;
        currentResult.textContent += e.target.dataset.btn;
    });
});

const pushDataToArray = function() {
    dataCollector.push(parseInt(currentResult.textContent));
    while(currentResult.firstChild) {
        currentResult.removeChild(currentResult.lastChild);
    }
}

clear.addEventListener('click', clearResult);
deleteResult.addEventListener('click', del);

add.addEventListener('click', () => {
    if(currentOperator === 'minus') recentOperator = 'minus';
    if(currentOperator === 'times') recentOperator = 'times';
    if(currentOperator === 'divide') recentOperator = 'divide';
    if(currentOperator === 'modulo') recentOperator = 'modulo';
    currentOperator = 'plus';
    pushDataToArray();
    if (dataCollector.length == 2 && recentOperator === 'minus') {
        difference();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'times') {
        product();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'divide') {
        quotient();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'modulo') {
        mod();
        removeDataFromArray();
    }
});

sub.addEventListener('click', () => {
    if(currentOperator === 'plus') recentOperator = 'plus';
    if(currentOperator === 'times') recentOperator = 'times';
    if(currentOperator === 'divide') recentOperator = 'divide';
    if(currentOperator === 'modulo') recentOperator = 'modulo';
    currentOperator = 'minus';
    pushDataToArray();
    if (dataCollector.length == 2 && recentOperator === 'plus') {
        sum();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'times') {
        product();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'divide') {
        quotient();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'modulo') {
        mod();
        removeDataFromArray();
    }
});

multiply.addEventListener('click', () => {
    if(currentOperator === 'plus') recentOperator = 'plus';
    if(currentOperator === 'minus') recentOperator = 'minus';
    if(currentOperator === 'divide') recentOperator = 'divide';
    if(currentOperator === 'modulo') recentOperator = 'modulo';
    currentOperator = 'times';
    pushDataToArray();
    if (dataCollector.length == 2 && recentOperator === 'plus') {
        sum();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'minus') {
        difference();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'divide') {
        quotient();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'modulo') {
        mod();
        removeDataFromArray();
    }
});

divide.addEventListener('click', () => {
    if(currentOperator === 'plus') recentOperator = 'plus';
    if(currentOperator === 'minus') recentOperator = 'minus';
    if(currentOperator === 'times') recentOperator = 'times';
    if(currentOperator === 'modulo') recentOperator = 'modulo';
    currentOperator = 'divide';
    pushDataToArray();
    if (dataCollector.length == 2 && recentOperator === 'plus') {
        sum();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'minus') {
        difference();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'times') {
        product();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'modulo') {
        mod();
        removeDataFromArray();
    }
});

modulo.addEventListener('click', () => {
    if(currentOperator === 'plus') recentOperator = 'plus';
    if(currentOperator === 'minus') recentOperator = 'minus';
    if(currentOperator === 'times') recentOperator = 'times';
    if(currentOperator === 'divide') recentOperator = 'divide';
    currentOperator = 'modulo';
    pushDataToArray();
    if (dataCollector.length == 2 && recentOperator === 'plus') {
        sum();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'minus') {
        difference();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'times') {
        product();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'divide') {
        quotient();
        removeDataFromArray();
    }
});

calculate.addEventListener('click', () => {
    if(dataCollector.length == 0) return;
    pushDataToArray();
    if(currentOperator === 'plus') sum();
    if(currentOperator === 'minus') difference();
    if(currentOperator === 'times') product();
    if(currentOperator === 'divide') quotient();
    if(currentOperator === 'modulo') mod();
    removeDataFromArray();
    calculateData();
})

function clearResult() {
    while(currentResult.firstChild) {
        currentResult.removeChild(currentResult.lastChild);
    }
}

function del() {
    if (currentResult.textContent.length == 0) return;
    currentResult.textContent = currentResult.textContent.slice(0, -1);
}

function sum() {
    dataCollector.reduce((x, y) => {
        dataCollector.push(x + y);
    });
}

function difference() {
    dataCollector.reduce((x, y) => {
        dataCollector.push(x - y);
    });
}

function product() {
    dataCollector.reduce((x, y) => {
        dataCollector.push(x * y);
    });
}

function quotient() {
    dataCollector.reduce((x, y) => {
        dataCollector.push(x / y);
    });
}

function mod() {
    dataCollector.reduce((x, y) => {
        dataCollector.push(x % y);
    });
}

function calculateData() {
    currentResult.textContent = dataCollector[dataCollector.length - 1];
    dataCollector.shift();
}

function removeDataFromArray() {
    for (x = 1; x < 3; x++) {
        dataCollector.shift()
    }
}
