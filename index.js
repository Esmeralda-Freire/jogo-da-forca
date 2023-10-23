import { randomWords } from "./mocks/randomWords"

function getRandomWords (words){
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}

let splittedWord = []
let rightLetters = []
let chances = 0
let numRightLetters = 0
let gameOver = false

function setHint (randomWord){
    const hintElement = document.getElementById("hint-text")
    hintElement.innerHTML = randomWord.hint
}

function disableButton(buttonId) {
    document.getElementById(buttonId).classList.add("disabled")
  }

function findLetter(letter) {
if (gameOver) return

let foundLetter = false
disableButton(letter)

    for (let index = 0; index < splittedWord.length; index++) {
        const element = splittedWord[index];
        if(element == letter){
            rightLetters[index] = letter
            numRightLetters++
            document.getElementById(`randomWord-${index}`).innerHTML = letter
            foundLetter = true
        }   
    }
    if(foundLetter == false){
        chances++
        const hangmanImgElement = document.getElementById("hangman-img")
        hangmanImgElement.src = `./images/hangman-${chances}.svg`

        const guessesElement = document.getElementById("guesses-text")
        guessesElement.innerHTML = `${chances}/6`
}

if(chances == 0){
    gameOver = true
    return
}

if(numRightLetters == splittedWord.length){
    gameOver = true
    return
}

}

/**
 * Gera um teclado virtual através da tabela ASCII.
 */
function generateKeyboard(){

    const keyboardHTMLElement = document.getElementById("keyboard")
    keyboardHTMLElement.innerHTML = "teclado"

 for (let index = 65; index <= 90; index++) {
  const letter = String.fromCharCode(index)
  const buttonHTML = `<button id="${letter}" onclick="findLetter('${letter}')" type="button" class="btn btn-primary">${letter}</button>`;

  keyboardContainer.innerHTML += buttonHTML
 }
}

document.addEventListener("keydown", function (event) {
    const pressedKey = event.key.toUpperCase()
    const buttonElement = document.getElementById(pressedKey);
  
    // Check if the button is disabled
    if (buttonElement?.classList.contains("disabled")) {
      return;
    }
  
    // Check if the pressed key is a valid letter (A-Z)
    const alphabetRegex = /^[A-Z]$/
    if (alphabetRegex.test(pressedKey)) {
      // Call the findLetter function with the pressed key
      findLetter(pressedKey)
      // Focus on the corresponding button
      buttonElement.focus()
    }
  })

  function setSecretWordBlankLetters() {
    const secretWordListElement = document.querySelector(".secret-word-ul");
  
    for (const index in wordSplitted) {
      secretWordListElement.innerHTML += `<li id='secret-word-${index}'>&#8203;</li>`;
    }
  }
  
  function startGame() {
    const randomWord = getRandomWord(randomWords);
    wordSplitted = randomWord.word.toUpperCase().split("");
    rightLetters = Array(splittedWord.length).fill("");
  
    generateKeyboard();
    setHint(randomWord);
    setSecretWordBlankLetters();
  }
  
  startGame();