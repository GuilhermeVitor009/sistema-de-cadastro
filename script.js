const { json } = require("express");

const submit = document.getElementById("submit");
function pegarDados() {
submit.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    const data = {
        name,
        password
    };

    const jsonData = JSON.stringify(data);
});
console.log("Dados enviados com sucesso!" + jsonData);
}