
const keyboardDiv = document.querySelector(".keyboard")
const secretyWordUl = document.querySelector(".secret-word-ul")
const guessesText = document.querySelector(".text-danger")
const hangmanImg = document.querySelector(".hangman-section img")
const gameModal = document.querySelector(".game-modal")
const playAgain = document.querySelector(".play-again")
let currentWord, correctLetters, wrongGuess;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuess = 0;
    guessesText.innerText = `${wrongGuess} / ${maxGuesses}`;
    hangmanImg.src = `images/hangman-${wrongGuess}.svg`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    secretyWordUl.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
    gameModal.classList.remove("show");
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        gameModal.querySelector("h1").innerText = `${isVictory ? 'Você ganhou!' : 'Você perdeu!'}`;
        gameModal.classList.add("show");

    },300)
}
const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if(letter == clickedLetter){
                correctLetters.push(letter);
                secretyWordUl.querySelectorAll("li")[index].innerText = letter;
                secretyWordUl.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        wrongGuess++;
        hangmanImg.src = `images/hangman-${wrongGuess}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuess} / ${maxGuesses}`;

    if(wrongGuess == maxGuesses) return gameOver(false);
    if(correctLetters.length == currentWord.length) return gameOver(true);

}

//create keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
 }

const wordList = [
    {word: "uva", hint: "Fruta roxa."},
    {word: "abacaxi", hint: "Fruta tropical."},
    {word: "banana", hint: "Fruta amarela."},
    {word: "gato", hint: "Animal de estimação."},
    {word: "leao", hint: "Rei da selva."}]

const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text").innerHTML = hint;
    resetGame();
    
 }



getRandomWord();
playAgain.addEventListener("click", getRandomWord)