let NumerosSorteados = [];
let numeroLimite = 10;
let tentativas = 1;
let botaoNovo = document.getElementById('reiniciar');
let numeroSecreto = gerarNumeroAleatorio();

//a função tem como parâmetro é uma tag(que pode ser o "p" do paragrafo ou o "h1").
//a var campo pega a tag, então, com innerHTML definimos o que será escrito.
//resumo: a função pega uma tag e escreva nela.
//com isso, escolhemos a tag e o que será escrito nela.
function exibirTextoNaTela(tag, texto) {
   let campo = document.querySelector(tag)
   campo.innerHTML = texto;
   responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function mensagemInicial (){
exibirTextoNaTela('h1', 'Jogo do número Secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

mensagemInicial();

function gerarNumeroAleatorio() {
   let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);
   let numeroSecreto;
   let elementosLista = NumerosSorteados.length;
   console.log(NumerosSorteados);

   if (elementosLista == numeroLimite) {
      NumerosSorteados = [];
   }

   if (NumerosSorteados.includes(numeroSorteado)){
      return gerarNumeroAleatorio();
   } else {
      NumerosSorteados.push(numeroSorteado);
      numeroSecreto = numeroSorteado;
      return numeroSecreto;
   }
}


function limparCampo() {
   chute = document.querySelector('input');
   chute.value = '';
}

function verificarChute() {
   let chute = document.querySelector('input').value;
   let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
   let mensagemTentativas = `Parabéns, você acertou em ${tentativas} ${palavraTentativas}`;

   if (chute == numeroSecreto) {
      exibirTextoNaTela('h1', mensagemTentativas);
      exibirTextoNaTela('p', `o número secreto era ${numeroSecreto}.`);
      botaoNovo.removeAttribute('disabled');

   } else if (chute > numeroSecreto) {
      exibirTextoNaTela('p', `o número secreto é menor que ${chute}`);

   } else {
      exibirTextoNaTela('p', `o número secreto é maior que ${chute}`);
   }
   tentativas++
   limparCampo();
}

function reiniciarJogo() {
   numeroSecreto = gerarNumeroAleatorio();
   limparCampo();
   tentativas = 1;
   mensagemInicial();
   botaoNovo.setAttribute('disabled', true); 
}