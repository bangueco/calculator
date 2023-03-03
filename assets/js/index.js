const buttons = document.querySelectorAll(`button[data-btn]`);
const currentResult = document.querySelector("#currentResult");

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

add.addEventListener('click', () => {
    if(currentOperator === 'minus') recentOperator = 'minus';
    if(currentOperator === 'times') recentOperator = 'times';
    currentOperator = 'plus';
    pushDataToArray();
    if (dataCollector.length == 2 && recentOperator === 'minus') {
        difference();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'times') {
        product();
        removeDataFromArray();
    }
});

sub.addEventListener('click', () => {
    if(currentOperator === 'plus') recentOperator = 'plus';
    if(currentOperator === 'times') recentOperator = 'times';
    currentOperator = 'minus';
    pushDataToArray();
    if (dataCollector.length == 2 && recentOperator === 'plus') {
        sum();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'times') {
        product();
        removeDataFromArray();
    }
});

multiply.addEventListener('click', () => {
    if(currentOperator === 'plus') recentOperator = 'plus';
    if(currentOperator === 'minus') recentOperator = 'minus';
    currentOperator = 'times';
    pushDataToArray();
    if (dataCollector.length == 2 && recentOperator === 'plus') {
        sum();
        removeDataFromArray();
    } else if (dataCollector.length == 2 && recentOperator === 'minus') {
        difference();
        removeDataFromArray();
    }
});

calculate.addEventListener('click', () => {
    pushDataToArray();
    if(currentOperator === 'plus') sum();
    if(currentOperator === 'minus') difference();
    if(currentOperator === 'times') product();
    removeDataFromArray();
    calculateData();
})

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

function calculateData() {
    currentResult.textContent = dataCollector[dataCollector.length - 1];
    dataCollector.shift();
}

function removeDataFromArray() {
    for (x = 1; x < 3; x++) {
        dataCollector.shift()
    }
}
