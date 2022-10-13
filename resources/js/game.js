
const wordOfTheDayURL = 'https://words.dev-apis.com/word-of-the-day'
let dailyWord = ''
async function getWord() {
  const promise = await fetch(wordOfTheDayURL)
  const processedWOD = await promise.json()
  console.log(processedWOD)
  dailyWord = processedWOD.word
}



function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

const beginGame = getWord()




let rowCount = 0
let columnCount = 1
let letterNum = 0
let testWord = ''

const letterblock = document.getElementsByClassName('letterblock')
const singleblock = document.getElementsByTagName('p')
console.log(singleblock)

document.addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    checkAnswer()
    /* Do something for Enter key */
  } else if (event.code === 'Backspace' && letterNum > 0) {
    singleblock[letterNum - 1].innerHTML = ''
    testWord = testWord.slice(0, testWord.length - 1)
    letterblock[letterNum - 1].style.borderColor = 'orange'
    letterNum--
  } else if (event.code === 'Backspace' && letterNum === 0) {
    letterblock[letterNum - 1].style.borderColor = 'orange'
    return
  } else {
    if (testWord.length <= 4) {
      singleblock[letterNum].innerHTML = event.key.toString()
      testWord = testWord + event.key.toString()
      letterblock[letterNum].style.borderColor = 'grey'
      letterNum = letterNum + 1
    }
  }
})

const checkAnswer = function () {
  if (columnCount < 6) {
    console.log(`You have pressed ENTER ${columnCount} times.`)
    letterNum = columnCount + 4
    testWord = ''
  } else {
    columnCount++
    console.log(`You have pressed ENTER ${columnCount} and LOST!`)
  }
}
