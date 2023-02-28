const buttons = document.querySelectorAll(`button`);
const currentResult = document.querySelector("#currentResult");


buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (!e.target.dataset.btn) return;

        console.log(e.target.dataset.btn)
        currentResult.textContent += `${e.target.button.dataset.btn}`;
    })
})