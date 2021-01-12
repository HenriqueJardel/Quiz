var questoes = null;
var anterior = null;
var respostaAtual = null;
var temporizador = null;
var corretas = 0;
var erradas = 0;
var recorde = parseInt(localStorage.getItem("recorde")) || 0;
var indiceQuestaoAtual = 0;
var tempo = 60;

var questoes = [
  {
    pergunta: 'O que HTML significa?',
    alternativas: [
      'Home Tool Markup Language',
      'Hyperlinks and Text Markup Language',
      'Hyper Text Markup Language',
      'Hyper Text Main Language',
    ],
    resposta: 'Hyper Text Markup Language',
  },
  {
    pergunta: 'O que CSS significa?',
    alternativas: [
      'Cascading Style Sheets',
      'Computer Style Sheets',
      'Colorful Style Sheets',
      'Creative Style Sheets',
    ],
    resposta: 'Cascading Style Sheets',
  },
  {
    pergunta: 'Quem está trabalhando nas especificações da web atualmente?',
    alternativas: [
      'Mozilla',
      'O World Wide Web Consortium (WWWC)',
      'Google',
      'Microsoft',
    ],
    resposta: 'O World Wide Web Consortium (WWWC)',
  },
  {
    pergunta: 'Quais destas tags não possuem valor semântico?',
    alternativas: ['<header>', '<em>', '<b>', '<strong>'],
    resposta: '<b>',
  },
  {
    pergunta: 'Não é um tipo válido em JS:',
    alternativas: ['string', 'number', 'object', 'smallint'],
    resposta: 'string',
  },
];

function iniciarQuestionario(){
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('questionario').style.display = 'initial';
  mostrarQuestao();
  Tempo();
}

function mostrarQuestao() {
  var questao = questoes[indiceQuestaoAtual];
  document.getElementById('pergunta').innerText = questao.pergunta;
  document.getElementById('opcao1').innerText = questao.alternativas[0];
  document.getElementById('opcao2').innerText = questao.alternativas[1];
  document.getElementById('opcao3').innerText = questao.alternativas[2];
  document.getElementById('opcao4').innerText = questao.alternativas[3];
  respostaAtual = null;
  if (anterior != null)
    document.getElementById(this.anterior).style.background = "aliceblue";
}

function atualizarTempo(){
  document.getElementById('Tempo').innerText = 'Tempo Restante: ' + tempo;
}

function Tempo()
{
  temporizador = setInterval(function(){
    tempo--;
    atualizarTempo();

    if (tempo <= 0) {
      window.alert('Tempo esgotado');
      clearInterval(temporizador);
      MostrarResultado();
    }
  },1000);
}

function MostrarResultado(){
  document.getElementById('questionario').style.display = 'none';
  document.getElementById('resultado').style.display = 'initial';
  document.getElementById('total').innerText = this.questoes.length - 1 ;
  document.getElementById('corretas').innerText = this.corretas;
  document.getElementById('erradas').innerText = this.erradas;
  document.getElementById('tempo').innerText = 60 - this.tempo + ' s';
  document.getElementById('recorde').innerText = this.recorde;
  clearInterval(this.temporizador);
}

function reiniciarQuestionario() {
  document.getElementById('questionario').style.display = 'initial';
  document.getElementById('resultado').style.display = 'none';
  corretas = erradas = indiceQuestaoAtual = 0;
  tempo = 31;
  mostrarQuestao();
  Tempo();
}

function opSelecionada(opcao) {
  if (anterior == null) 
    anterior = opcao.id;
  else {
    document.getElementById(this.anterior).style.background = "aliceblue";
    anterior = opcao.id;
  }
  opcao.style.background = "deepskyblue";
  respostaAtual = opcao.textContent;
}

function Proximo() {
  processarResposta(this.respostaAtual);
}

function processarResposta(Resposta) {
  if (Resposta != null) {
    var questao = questoes[indiceQuestaoAtual];
    if (indiceQuestaoAtual != questoes.length - 1) {
      if (Resposta == questao.resposta) {
        corretas++;
        indiceQuestaoAtual++;
        mostrarQuestao();
      }
      else {
        indiceQuestaoAtual++;
        erradas++;
        mostrarQuestao();
      }
    }
    else {
      recorde = Math.max(corretas,recorde); 
      MostrarResultado();
    }
  }
  else {
    window.alert("Selecione uma opção!");
  }
}

