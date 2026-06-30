import { adicionarSessao, deletarLivro, editarLivro } from "../api/livro.js";

function qSelector(seletor) {
  return document.querySelector(seletor);
}

const params = new URLSearchParams(window.location.search);
const idLivro = params.get("id");

const botaoRemover = qSelector("#botao-remover");
const botaoCancelar = qSelector("#btn-cancelar-modal");
const botaoDeletar = qSelector("#btn-deletar");
const modalDeletarLivro = qSelector("#modal-deletar-livro");

if (botaoRemover && modalDeletarLivro) {
  botaoRemover.addEventListener("click", () => {
    modalDeletarLivro.classList.add("ativo");
  });
}

if (botaoCancelar && modalDeletarLivro) {
  botaoCancelar.addEventListener("click", () => {
    modalDeletarLivro.classList.remove("ativo");
  });
}

if (botaoDeletar && modalDeletarLivro) {
  botaoDeletar.addEventListener("click", async () => {
    if (!idLivro) return;

    await deletarLivro(idLivro);
    modalDeletarLivro.classList.remove("ativo");
    window.location.href = "/index.html";
  });
}

const botaoAddSessao = qSelector("#botao-criar-sessao");
const botaoCancelarAdicao = qSelector("#btn-cancelar-adicao-sessao");
const formularioSessao = qSelector("#form-criar-sessao");
const modalAdicionarSessao = qSelector("#form-adicionar-sessao");

if (botaoAddSessao && modalAdicionarSessao) {
  botaoAddSessao.addEventListener("click", () => {
    modalAdicionarSessao.classList.add("ativo");
  });
}

if (botaoCancelarAdicao && modalAdicionarSessao) {
  botaoCancelarAdicao.addEventListener("click", () => {
    modalAdicionarSessao.classList.remove("ativo");
  });
}

if (formularioSessao && modalAdicionarSessao) {
  formularioSessao.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!idLivro) return;

    const dados = new FormData(formularioSessao);
    const sessaoLeitura = Object.fromEntries(dados.entries());

    sessaoLeitura.qtdPaginas = Number(sessaoLeitura.qtdPaginas);
    const livroFinalizado = await adicionarSessao(idLivro, sessaoLeitura);
    formularioSessao.reset();
    modalAdicionarSessao.classList.remove("ativo");
    if (!livroFinalizado) {
      window.location.reload();
    }
  });
}

export async function finalizarLivro() {
  const modalRegistrarOpiniao = qSelector("#modal-registrar-opiniao");
  const formularioEditarSessao = qSelector("#form-editar-livro");

  if (modalRegistrarOpiniao) {
    modalRegistrarOpiniao.classList.add("ativo");
  }

  if (formularioEditarSessao) {
    // Criar novo formulário para remover listeners antigos
    const novoFormulario = formularioEditarSessao.cloneNode(true);
    formularioEditarSessao.parentNode.replaceChild(
      novoFormulario,
      formularioEditarSessao,
    );

    novoFormulario.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!idLivro) return;

      const dados = new FormData(novoFormulario);
      const review = Object.fromEntries(dados.entries());

      review.nota = Number(review.nota);
      await editarLivro(idLivro, review);
      novoFormulario.reset();

      if (modalRegistrarOpiniao) {
        modalRegistrarOpiniao.classList.remove("ativo");
      }
      window.location.reload();
    });
  }
}

// const botaoAddSessao = qSelector("#btn-editar-livro");
// const botaoCancelarAdicao = qSelector("#btn-cancelar-editar-livro");
