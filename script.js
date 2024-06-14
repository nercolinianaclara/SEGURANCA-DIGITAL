const numeroSenha = document.querySelector('.parametro-senha__texto'); 
let tamanhoSenha = 12; // Tamanho padrão da senha
numeroSenha.textContent = tamanhoSenha; // Exibe o tamanho padrão na tela
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ'; // 26 letras maiúsculas disponíveis
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz'; // 26 letras minúsculas disponíveis
const numeros = '0123456789'; // 10 números disponíveis
const simbolos = '!@%*?'; // 5 símbolos disponíveis
const botoes = document.querySelectorAll('.parametro-senha__botao'); // 5 botões
const campoSenha = document.querySelector('#campo-senha'); // campo de texto onde a senha será exibida
const checkbox = document.querySelectorAll('.checkbox'); // 5 checkbox disponíveis
const forcaSenha = document.querySelector('.forca'); // barra de força da senha

botoes[0].onclick= diminuiTamanho; // diminui o tamanho da senha
botoes[1].onclick= aumentaTamanho; // aumenta o tamanho da senha

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        // tamanhoSenha = tamanhoSenha-1;
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
} // função que diminui o tamanho da senha

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        // tamanhoSenha = tamanhoSenha+1;
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
} // função que aumenta o tamanho da senha

for (i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
} // evento de clique para cada checkbox

geraSenha();

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    } // se a checkbox estiver marcada, adiciona a string com as letras maiúsculas
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    } // se a checkbox estiver marcada, adiciona a string com as letras minúsculas
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    } // se a checkbox estiver marcada, adiciona a string com os números
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    } // se a checkbox estiver marcada, adiciona a string com os símbolos
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    } // gera a senha
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
} // função que gera a senha

function classificaSenha(tamanhoAlfabeto){
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia); // entropia da senha
    forcaSenha.classList.remove('fraca','media','forte');
    if (entropia > 57){
        forcaSenha.classList.add('forte'); // senha forte
    } else if (entropia > 35 && entropia < 57 ) {
        forcaSenha.classList.add('media'); // senha média
    } else if (entropia <= 35){
        forcaSenha.classList.add('fraca'); // senha fraca
    }
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2**entropia/(100e6*60*60*24)) + " dias para descobrir essa senha."; 
} // função que exibe a quantidade de dias para decobrir a senha
