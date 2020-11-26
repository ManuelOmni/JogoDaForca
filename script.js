/* Elemento HTML referente a categoria */
let categoryName = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
let wrongLetters = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
let dashes = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
let eyes = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let bodyParts = Array.from(document.querySelectorAll("#person div"));
bodyParts = bodyParts.slice(2, bodyParts.length);
/* Palavra corrente */
let currentWord;
/* Lista das letras erradas */
let wrongLettersArray = []; //Explicar
/* Lista com as letras da palavra corrente */
let correctLetters = []; //Explicar
/* Index da parte do corpo corrente */
let bodyCounter;
/* Numero de chances do jogador */
const numOfChances = 7;
/* Valor para opacidade dos olhos */
const opacityEyes = 0.3;

/*
Cria as categorias em objetos
Darei um exemplo e o aluno completa como achar melhor
*/
const categories = {
    frutas: ["banana", "maça", "laranja", "mamao", "uva", "melancia", "melao"],
    profissões: ["engenheiro", "advogado", "medico", "professor", "pescador"],
    animais: ["papagaio", "galo", "cachorro", "gato", "galinha", "cavalo", "porco"],
    cores: ["amarelo", "azul", "laranja", "roxo", "vermelho", "marrom"]
}

/*
Gera um numero aleatorio de acordo com o valor máximo passado no argumento
*/
function getRandomNumber(max) {
    /*
    Dica: Use Math.random e Math.floor
    */
    return Math.floor(Math.random() * max);
}

/*
Transforma as chaves do objeto em array
O aluno irá implementar 
Importante para treinar as propriedades dos objetos
*/
function getCatagoryArray(categoriesArray) {
    return Object.keys(categories);
}

/*
Seleciona uma categoria aleatoriamente
*/
function getRandomCategory() {
    /*
    Crie um array com todas as categorias
    Gere um número aleatório com valor máximo igual ao numéro total de categorias
    Retorne a categoria selecionada
    */
    const categoriesArray = getCatagoryArray();
    let categoryIndex  = getRandomNumber(categoriesArray.length);
    let randomCategory  = categoriesArray[categoryIndex];
    return randomCategory;
}

/*
Exibe a categoria na UI 
*/
function setCategoryName() {
    categoryName.innerHTML = getRandomCategory();
}

/*
Define aleatoriamente a palavra que será adivinhada
*/
function setCurrentWord() {
    /*
    Crie um array com as possíveis palavras de acordo com a categoria definida
    Selecione aleatoriamente uma dessas palavras
    Atualize correctLetters com as letras da palavra selecionada
        Dica: Use o método split
    Oculte a palavra selecionada na UI
    */
    const wordsArray = categories[categoryName.innerHTML];
    let wordsIndex  = getRandomNumber(wordsArray.length);
    currentWord = wordsArray[wordsIndex];
    correctLetters = currentWord.split(''); // Lista de verificação
    hideWord();
}

/*
Oculta a palavra para ser exibida na UI
*/
function hideWord() {
    /*
    Gere uma string com a quantidade de traços igual ao tamanho de currentWord
    Atualize a mensagem na UI com a nova string
    */
    let hideWord = "";
    for (const iterator of currentWord) {
        hideWord += "-"
    }
    setMessage(hideWord);
}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função game
*/
function getCharCode(e){
    game(e.key);
}

/*
Recebe uma String
Substitui os traços da palavra oculta pela letra passada como parâmetro 
*/
function updateDashes(letter){
    /*
    Percorra currentWord
        Substitua os traços pela letra informada nas posições corretas
            Dica: Crie uma variável auxiliar
    Atualize a mensagem na UI
    */
    let word = "";
    for (let i = 0; i < currentWord.length; i++) {
        if(currentWord[i] === letter){
            word += letter;
        
        } else if(dashes.innerHTML[i] != "-"){
            word += dashes.innerHTML[i];
        } else{
            word += "-";
        }        
    }
    setMessage(word);
}

/*
Desenha a parte do corpo corrente
*/
function drawBodyParts(){
    bodyParts[bodyCounter].classList.remove("hide");
    bodyCounter++; 
}

/*
Recebe uma String
Verifica se a String contem na palavra
*/
function game(letter){
    /*
    Se currentWord possuir letter
        Atualize dashes subistituindo o(s) traço(s) por letter   
    */
    if(correctLetters.includes(letter)){
        updateDashes(letter);
    /*
    Se não
        Adicione letter em wrongLettersArray
        Atualize wrongLetters na UI
        Desenhe uma parte do corpo
    */
    } else {
        wrongLettersArray.push(letter);
        wrongLetters.innerHTML = "Letras erradas: " + wrongLettersArray;
        if(bodyParts.length > bodyCounter){
            drawBodyParts();
        }
    }
    /*
    Varefique o encerramento do jogo
    */
    checkEndGame();
}

/*
Verifica a condição para encerramento (jogador ganhou ou perdeu)
    Se ganhou, exiba uma mensagem. Ex: Você venceu
    Se perdeu, exiba uma mensagem. Ex: Você perdeu
    Se não, não faça nada
*/
function checkEndGame(){
    /*
    Condição da vitória: dashes não conter -
        Defina uma mensagem para exibir na UI
        Remova o evento listener para captura de tecla
    */
    if(!dashes.innerHTML.includes('-')) {
        setMessage("Você venceu!");
        window.removeEventListener("keypress", getCharCode); //Ver alguma forma de reusar
    /*
    Condição da derrota: número de letras erradas ser maior ou igual ao numero de chances
        Desenhe os olhos
        Defina uma mensagem para exibir na UI
        Remova o evento listener para captura de tecla
    */
    }else if(wrongLettersArray.length >= numOfChances){
        drawEyes();
        setMessage("Você perdeu!");
        window.removeEventListener("keypress", getCharCode);
    }
}

/*
Atualiza a mensagem exibida na UI
Recebe como argumento uma String e a define como a mensagem na UI.
*/
function setMessage(message){
    dashes.innerHTML = message;
}

/* 
Desenha os olhos do personagem
*/
function drawEyes(){
    eyes.forEach((eye => {
        eye.style.opacity = 1;
        eye.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function initPerson(){
    eyes.forEach((eye => {
        eye.style.opacity = opacityEyes; 
    }));
    bodyParts.forEach(bodyPart => {
        bodyPart.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function init(){
    bodyCounter = 0;
    wrongLettersArray = [];
    wrongLetters.innerHTML = "Letras erradas: "; 
    initPerson();
    setCategoryName();
    setCurrentWord();
    window.addEventListener("keypress", getCharCode);
}

window.addEventListener("load", init);
