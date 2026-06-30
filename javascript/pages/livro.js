let params = new URLSearchParams(window.location.search);
let idLivro = params.get("id");

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
  await deletarLivro(idLivro);
  qSelector(".modal-overlay").classList.remove("ativo");
});
