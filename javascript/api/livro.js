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
  const url = `${urlAPI}/livros?titulo=${titulo}`;
  const resposta = await fetch(url);

  const livros = await resposta.json();
  return livros[0].id;
}

export async function buscarSessoesLivro(idLivro) {
  const resposta = await fetch(
    `${urlAPI}/livros/${idLivro}/sessoes-de-leitura`,
  );

  return resposta.json();
}
