import {
  buscarIdLivro,
  buscarLivros,
  buscarSessoesLivro,
  buscarUltimaSessao,
} from "../api/livro.js";
import {
  atualizarCardUltimaSessao,
  criarCard,
} from "../components/homepage.js";
import {
  buscarLivros,
  buscarUltimaSessao,
  adicionarLivro,
} from "../api/livro.js";
import {
  atualizarCardUltimaSessao,
  criarCard,
} from "../components/homepage.js";

function qSelector(q) {
  return document.querySelector(q);
}

async function renderizarLivros() {
  const livros = await buscarLivros();

  const container = document.getElementById("books-grid");
  container.innerHTML = "";

  livros.forEach((livro) => {
    container.innerHTML += criarCard(livro);
  });
  for (let livro of livros) {
    let idLivro = await buscarIdLivro(livro.titulo);
    let sessoes = await buscarSessoesLivro(idLivro);

    let totalLido = sessoes.reduce((soma, sessao) => {
      return soma + sessao.qtdPaginas;
    }, 0);

    let progresso = Math.round((totalLido / livro.qtdPaginas) * 100);

    container.innerHTML += criarCard(livro, progresso);
  }
}

async function renderizarUltimaSessao() {
  const ultimaSessao = await buscarUltimaSessao();

  atualizarCardUltimaSessao(ultimaSessao);
}

window.irParaSessoes = function (id) {
  window.location.href = `pages/livro.html?id=${id}`;
};

renderizarLivros();
renderizarUltimaSessao();

// Botões e forms
const botaoAdicionarLivro = qSelector("#botao-hp-adicionar-livro");
const formularioAdicao = qSelector("#form-livro");
const botaoCancelarAdicao = qSelector("#btn-cancelar-adicao");
const modalFormAdicao = qSelector("#form-adicionar-livro");

formularioAdicao.addEventListener("submit", async (event) => {
  event.preventDefault();

  const dados = new FormData(formularioAdicao);

  const livro = Object.fromEntries(dados.entries());

  livro.paginas = Number(livro.paginas);
  await adicionarLivro(livro);
  formularioAdicao.reset();
});

botaoCancelarAdicao.addEventListener("click", () => {
  formularioAdicao.reset();
  qSelector("#form-adicionar-livro").classList.remove("ativo");
});

botaoAdicionarLivro.addEventListener("click", () => {
  modalFormAdicao.classList.add("ativo");
});
