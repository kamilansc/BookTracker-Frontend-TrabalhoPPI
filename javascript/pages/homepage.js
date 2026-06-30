import { buscarLivros, buscarUltimaSessao } from "../api/livro.js";
import { atualizarCardUltimaSessao, criarCard } from "../components/homepage.js";

async function renderizarLivros() {
    const livros = await buscarLivros();

    const container = document.getElementById("books-grid");
    container.innerHTML = "";

    livros.forEach(livro => {
        container.innerHTML += criarCard(livro)
    });
}

async function renderizarUltimaSessao() {
    const ultimaSessao = await buscarUltimaSessao();

    atualizarCardUltimaSessao(ultimaSessao);
}


renderizarLivros();
renderizarUltimaSessao();