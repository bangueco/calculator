const buttons = document.querySelectorAll(`button[data-btn]`);
const currentResult = document.querySelector("#currentResult");


buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (!e.target.dataset.btn) return;

        currentResult.textContent += e.target.dataset.btn;
    })
})