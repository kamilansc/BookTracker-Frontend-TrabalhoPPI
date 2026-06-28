function capturarHoraAtual(){
    const dtHora = new Date();
    
    const dia = dtHora.getDate();
    const mes = String(dtHora.getMonth() + 1).padStart(2, '0');
    const ano = dtHora.getFullYear().toString().slice(-2);

    const hora = String(dtHora.getHours()).padStart(2, '0');
    const minutos = String(dtHora.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} • ${hora}:${minutos}`;
}

function atualizarHora(){
    let campoClock = document.getElementById('clock');
    const horaAtual = capturarHoraAtual();

    campoClock.innerText = horaAtual
}
atualizarHora();
setInterval(atualizarHora, 1000);

