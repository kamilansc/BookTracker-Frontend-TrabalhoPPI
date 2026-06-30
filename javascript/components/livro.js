let API_URL = "https://booktracker-api-trabalho-ppi.onrender.com";

function qSelector(seletor) {
    return document.querySelector(seletor);
}

let params = new URLSearchParams(window.location.search);
let idLivro = params.get("id");

let livroAtual = null;

async function carregarLivro() {
    try {
        let response = await fetch(`${API_URL}/livros/${idLivro}`);

        if (!response.ok) {
            throw new Error("Livro não encontrado.");
        }

        livroAtual = await response.json();

        qSelector("#titulo").textContent = livroAtual.titulo;
        qSelector("#autor").textContent = livroAtual.autor;
        qSelector("#genero").textContent = livroAtual.genero;
        qSelector("#qtdPag").textContent = livroAtual.qtdPaginas;
        qSelector("#dtInicio").textContent = formatarData(livroAtual.comecouEm);
        qSelector("#dtFim").textContent = livroAtual.terminouEm? formatarData(livroAtual.terminouEm): "Em andamento";
        qSelector("#opiniao").textContent = livroAtual.opiniao ?? "Sem opinião cadastrada.";

    } catch (error) {
        console.error(error);
    }
}

let btnOpiniao = qSelector("#btnOpiniao");
let conteudoOpiniao = qSelector("#conteudoOpiniao");

btnOpiniao.addEventListener("click", () => {
    conteudoOpiniao.classList.toggle("opnOculto");
});


async function carregarSessoes() {

    try {

        let response = await fetch(
            `${API_URL}/livros/${idLivro}/sessoes-de-leitura`
        );

        if (!response.ok) {
            throw new Error("Erro ao carregar as sessões.");
        }

        let sessoes = await response.json();

        atualizarBarraProgresso(sessoes);

        let lista = qSelector("#listaSessoes");

        lista.innerHTML = "";

        if (sessoes.length === 0) {

            lista.innerHTML = `
                <p class="sem-sessoes">
                    Este livro ainda não possui sessões de leitura.
                </p>
            `;

            return;
        }

        sessoes.forEach(sessao => {

            let card = document.createElement("section");
            card.className = "sessoes-leitura";

            card.innerHTML = `
                <div class="sessao-img">
                    <img src="../assets/images/icone-livro-estrela.png" alt="Livro aberto">
                </div>

                <div class="sessao-info">

                    <h3 class= "sessaoLeitura">Sessão de leitura</h3>

                    <div class="dados-sessao">
                        <p>Data da sessão: ${formatarData(sessao.dataSessao)}</p>
                        <p>Quantidade de páginas: ${sessao.qtdPaginas}</p>
                    </div>

                    <div class="comentario-sessao">
                        <p>${sessao.comentario}</p>
                    </div>

                </div>
            `;

            lista.appendChild(card);

        });

    } catch (error) {
        console.error(error.message);
    }

}

function formatarData(data) {

    if (!data) return "-";

    let dataFormatada = new Date(data);

    return dataFormatada.toLocaleDateString("pt-BR");
}

function atualizarBarraProgresso(sessoes) {

    let totalLido = sessoes.reduce((soma, sessao) => {
        return soma + sessao.qtdPaginas;
    }, 0);

    let porcentagem = Math.round((totalLido / livroAtual.qtdPaginas) * 100);

    qSelector(".progresso").style.width = `${porcentagem}%`;

    qSelector("#porcentagem").textContent = `${porcentagem}%`;
}

const botaoRemover = qSelector("#botao-remover");
const botaoCancelar = qSelector("#btn-cancelar-modal");
const botaoDeletar = qSelector("#btn-deletar");

const deletarLivro = async (id) => {
  try {
    const response = await fetch(`${API_URL}/livros/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }
  } catch (erro) {
    console.error("Erro:", erro);
  }
};

    botaoRemover.addEventListener("click", () => {
    qSelector(".modal-overlay").classList.add("ativo");
    });

    botaoCancelar.addEventListener("click", () => {
    qSelector(".modal-overlay").classList.remove("ativo");
    });

    botaoDeletar.addEventListener("click", async () => {
    /*pegar o id do livro */
    await deletarLivro(idLivro);
    qSelector(".modal-overlay").classList.remove("ativo");
    });



async function iniciarPagina() {
    await carregarLivro();
    await carregarSessoes();
}

iniciarPagina();