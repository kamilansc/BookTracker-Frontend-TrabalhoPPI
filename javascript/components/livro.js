function Qselector(q) {
  return document.querySelector(q);
}

function qSelector(q) {
  return document.querySelector(q);
}

const botaoRemover = qSelector("#botao-remover");
const botaoCancelar = qSelector("#btn-cancelar-modal");
const botaoDeletar = qSelector("#btn-deletar");

botaoRemover.addEventListener("click", () => {
  qSelector(".modal-overlay").classList.add("ativo");
});

botaoCancelar.addEventListener("click", () => {
  qSelector(".modal-overlay").classList.remove("ativo");
});

botaoDeletar.addEventListener("click", async () => {
  /*pegar o id do livro */
  await deletarLivro(id);
  qSelector(".modal-overlay").classList.remove("ativo");
});
