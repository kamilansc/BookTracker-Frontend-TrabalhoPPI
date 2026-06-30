import {
  adicionarLivro,
  buscarIdLivro,
  buscarLivros,
  buscarSessoesLivro,
  buscarUltimaSessao,
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
  if (!container) return;

  container.innerHTML = "";

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

  if (!ultimaSessao) return;
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

if (formularioAdicao) {
  formularioAdicao.addEventListener("submit", async (event) => {
    event.preventDefault();

    const dados = new FormData(formularioAdicao);

    const livro = Object.fromEntries(dados.entries());

    livro.qtdPaginas = Number(livro.qtdPaginas);
    await adicionarLivro(livro);
    formularioAdicao.reset();
  });
}

if (botaoCancelarAdicao && formularioAdicao && modalFormAdicao) {
  botaoCancelarAdicao.addEventListener("click", () => {
    formularioAdicao.reset();
    modalFormAdicao.classList.remove("ativo");
    window.location.reload();
  });
}

if (botaoAdicionarLivro && modalFormAdicao) {
  botaoAdicionarLivro.addEventListener("click", () => {
    modalFormAdicao.classList.add("ativo");
  });
}
