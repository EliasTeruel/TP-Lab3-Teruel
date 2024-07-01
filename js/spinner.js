function mostrarSpinner() {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "flex";
}

function ocultarSpinner() {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "none";
}


export function mostrarSpinnerConDelay(segundos) {
    mostrarSpinner();
    setTimeout(() => {
        ocultarSpinner();
    }, segundos * 1000);

}