import { finalizarLivro } from "../pages/livro.js";

const URL_API = "https://booktracker-api-trabalho-ppi.onrender.com";

export const adicionarLivro = async (livro) => {
  try {
    const response = await fetch(`${URL_API}/livros`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    });

    if (!response.ok) {
      throw new Error(response.body);
    }

    const resultado = await response.json();
    console.log(resultado);
  } catch (erro) {
    console.error(erro);
  }
};

export const deletarLivro = async (id) => {
  try {
    const response = await fetch(`${URL_API}/livros/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.body);
    }
  } catch (erro) {
    console.error("Erro:", erro);
  }
};

export async function buscarLivros() {
  const resposta = await fetch(
    "https://booktracker-api-trabalho-ppi.onrender.com/livros",
  );

  return resposta.json();
}

export async function buscarUltimaSessao() {
  const resposta = await fetch(
    "https://booktracker-api-trabalho-ppi.onrender.com/sessoes-de-leitura",
  );

  const sessoes = await resposta.json();
  return sessoes[0];
}

export async function buscarIdLivro(titulo) {
  const url = `${URL_API}/livros?titulo=${titulo}`;
  const resposta = await fetch(url);

  const livros = await resposta.json();
  return livros[0].id;
}

export async function buscarSessoesLivro(idLivro) {
  const resposta = await fetch(
    `${URL_API}/livros/${idLivro}/sessoes-de-leitura`,
  );

  return resposta.json();
}

export async function buscarLivro(idLivro) {
  const url = `${URL_API}/livros/${idLivro}`;
  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Não foi possível buscar o livro.");
    }

    return await resposta.json();
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

export const adicionarSessao = async (idLivro, sessaoLeitura) => {
  try {
    let sessoes = await buscarSessoesLivro(idLivro);
    let livro = await buscarLivro(idLivro);

    let totalLido = sessoes.reduce((soma, sessao) => {
      return soma + sessao.qtdPaginas;
    }, 0);

    if (totalLido + sessaoLeitura.qtdPaginas > livro.qtdPaginas) {
      console.error("Não é possivel criar");
      throw new Error(
        "A quantidade de páginas lidas não pode ultrapassar o total de páginas do livro.",
      );
    }

    const response = await fetch(
      `${URL_API}/livros/${idLivro}/sessoes-de-leitura`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessaoLeitura),
      },
    );

    if (!response.ok) {
      throw new Error(response.body);
    }

    const resultado = await response.json();
    console.log(resultado);

    if (
      totalLido + Number(sessaoLeitura.qtdPaginas) ===
      Number(livro.qtdPaginas)
    ) {
      await finalizarLivro();
      return true;
    }
    return false;
  } catch (erro) {
    console.error(erro);
    return false;
  }
};

export const editarLivro = async (idLivro, review) => {
  try {
    const body = {
      ...review,
      terminouEm: new Date(),
    };

    const response = await fetch(`${URL_API}/livros/${idLivro}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.body);
    }

    const resultado = await response.json();
    console.log(resultado);
  } catch (erro) {
    console.error(erro);
  }
};
