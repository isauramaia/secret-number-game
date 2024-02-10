let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function modificarTexto (tag, texto) {
    let titulo = document.querySelector(tag);
    titulo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial () {
    modificarTexto('h1', 'Jogo do número secreto');
    modificarTexto('p',  `Digite um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function gerarNumeroAleatorio () {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);        
        return numeroEscolhido;
    }
}

function verificarChute () {
    let chute = document.querySelector('input').value;
 
    if (chute == numeroSecreto) {
        modificarTexto('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        modificarTexto('p', `Você adivinhou o número secreto com ${tentativas} ${palavraTentativa}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
        modificarTexto('p', 'O número secreto é menor');
        
    } else {
        modificarTexto('p', 'O número secreto é maior');
        
    }
    tentativas++;
    limparCampo();
    }   
}

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';    
}


function reiniciarJogo () {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}


