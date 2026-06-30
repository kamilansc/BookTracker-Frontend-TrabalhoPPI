var urlAPI = 'https://booktracker-api-trabalho-ppi.onrender.com';

export async function buscarLivros() {
    const resposta = await fetch(`${urlAPI}/livros`);

    return resposta.json();
}

export async function buscarUltimaSessao() {
    const resposta = await fetch(`${urlAPI}/sessoes-de-leitura`);
    
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
    const resposta = await fetch(`${urlAPI}/livros/${idLivro}/sessoes-de-leitura`);

    return resposta.json();
}