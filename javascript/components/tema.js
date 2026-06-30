const btnTema = document.getElementById("btnTema");

if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark");
    btnTema.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
}

btnTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("tema", "dark");
        btnTema.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
    } else {
        localStorage.setItem("tema", "light");
        btnTema.classList.replace("bi-sun-fill", "bi-moon-stars-fill");
    }
});