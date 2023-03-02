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

const pushDataToArray = function() {
    dataCollector.push(parseInt(currentResult.textContent));
    while(currentResult.firstChild) {
        currentResult.removeChild(currentResult.lastChild);
    }
}

add.addEventListener('click', () => {
    pushDataToArray();
    if (dataCollector.length == 2) {
        sum();
        removeDataFromArray();
    }
});

calculate.addEventListener('click', () => {
    pushDataToArray();
    sum();
    removeDataFromArray();
    calculateData();
})

function sum() {
    dataCollector.reduce((x, y) => {
        dataCollector.push(x + y);
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
