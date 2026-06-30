export function criarCard(livro, progresso) {
  return `
        <div class="book-card">
            <div class="book-header">
                <img class="book-icon" src='assets/images/book-icon.png'>
                <div class="book-info">
                    <p class="book-title">Título: ${livro.titulo}</p>
                    <p class="book-author">${livro.autor}</p>
                    <p class="book-genre">${livro.genero}</p>
                </div>
            </div>

            <div class="book-progress">
                <div class="progress-bar">
                    <div class="progress" style="width:${progresso}%"></div>
                </div>
            </div>

            <div class="book-buttons">
                <button onclick="irParaSessoes(${livro.id})">Sessões</button>
            </div>
        </div> 
    `;
}

export function atualizarCardUltimaSessao(ultimaSessao) {
  const campoData = document.getElementById("session-date");
  const campoPages = document.getElementById("session-pages");
  const campoComment = document.getElementById("session-comment");

  const data = new Date(ultimaSessao.dataSessao).toLocaleDateString("pt-BR");
  campoData.innerText = `Data da sessão: ${data}`;
  campoPages.innerText = `${ultimaSessao.qtdPaginas} páginas lidas`;
  campoComment.innerText = ultimaSessao.comentario;
}
