export async function buscarLivros() {
    const resposta = await fetch('https://booktracker-api-trabalho-ppi.onrender.com/livros');

    return resposta.json();
}

export async function buscarUltimaSessao() {
    const resposta = await fetch('https://booktracker-api-trabalho-ppi.onrender.com/sessoes-de-leitura');
    
    const sessoes = await resposta.json();
    return sessoes[0];
}