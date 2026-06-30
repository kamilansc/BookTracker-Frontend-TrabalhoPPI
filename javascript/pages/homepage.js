import { buscarIdLivro, buscarLivros, buscarSessoesLivro, buscarUltimaSessao } from "../api/livro.js";
import { atualizarCardUltimaSessao, criarCard } from "../components/homepage.js";

async function renderizarLivros() {
    const livros = await buscarLivros();

    const container = document.getElementById("books-grid");
    container.innerHTML = "";

    for (let livro of livros) {
        let idLivro = await buscarIdLivro(livro.titulo);
        let sessoes = await buscarSessoesLivro(idLivro);

        let totalLido = sessoes.reduce((soma, sessao) => {
        return soma + sessao.qtdPaginas;
        }, 0);

        let progresso = Math.round((totalLido / livro.qtdPaginas) * 100);
        
        container.innerHTML += criarCard(livro, progresso);
    };
}

async function renderizarUltimaSessao() {
    const ultimaSessao = await buscarUltimaSessao();

    atualizarCardUltimaSessao(ultimaSessao);
}

window.irParaSessoes = function(id) {
    window.location.href=`pages/livro.html?id=${id}`;
}

renderizarLivros();
renderizarUltimaSessao();