

const submit = document.getElementById("submit");
console.log(submit);

submit.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    const data = {
        name,
        password
    };
    document.getElementById("div").style.display = "block";
    document.getElementById("div").innerText = "MUDOU";

});

