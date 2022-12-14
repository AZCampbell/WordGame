const wordOfTheDayURL = 'https://words.dev-apis.com/word-of-the-day'
let dailyWord = ''
async function getWord() {
  const promise = await fetch(wordOfTheDayURL)
  const processedWOD = await promise.json()
  console.log(processedWOD)
  dailyWord = processedWOD.word
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter)
}

const beginGame = getWord()

let columnCount = 1
let letterNum = 0
let beginLetter = 0
let testWord = ''
let guessed = []

const letterblock = document.getElementsByClassName('letterblock')
const singleblock = document.getElementsByTagName('p')
console.log(singleblock)

document.addEventListener('keydown', function (event) {
  if (!isLetter(event.key)) {
    if (
      event.code === 'Backspace' &&
      letterNum > 0 &&
      letterNum > beginLetter
    ) {
      singleblock[letterNum - 1].innerHTML = ''
      testWord = testWord.slice(0, testWord.length - 1)
      letterblock[letterNum - 1].style.borderColor = 'orange'
      letterNum--
    } else if (event.code === 'Enter') {
      checkAnswer()
    }
  } else {
    if (testWord.length <= 4) {
      
      singleblock[letterNum].innerHTML = event.key.toString();
      testWord = testWord + event.key.toString();
      letterblock[letterNum].style.borderColor = 'grey'
      letterNum = letterNum + 1
    }
  }
})

const checkAnswer = () => {
  if (testWord.length === 5) {
    for (let i = 0; i <= testWord.length - 1; i++) {
      for (let j = 0; j <= dailyWord.length - 1; j++) {
        if (testWord[i] === dailyWord[j]) {
          if (i === j) {
            turnGreen(i)
            guessed.push(testWord[i]);
            
          } else if (i != j) {
            console.log("There are yellows here!")
            turnYellow(i)
            guessed.push(testWord[i]);
            console.log(`pushed ${testWord[i]}`);
          }
        } 
        
      }
    }
    if (columnCount < 6) {
      console.log(`You have pressed ENTER ${columnCount} times.`)
      

      beginLetter = letterNum
      testWord = ''
    } else {
      columnCount++
      console.log(`You have pressed ENTER ${columnCount} and LOST!`)
    }
  } 
  guessed = [];
}

const turnGreen = function (index) {
  currentSpot = beginLetter + index
  letterblock[currentSpot].style.backgroundColor = 'green'
}

const turnYellow = function (index) {
  if (guessed.includes(testWord[index]) === true) {
    console.log("I am running the if part")
    turnGrey(index)
  } else {
    console.log("I am running the else part")
   
   
    guessed.push(testWord[index])
    currentSpot = beginLetter + index
    letterblock[currentSpot].style.backgroundColor = 'yellow'
  }
}
const turnGrey = function (index) {
  currentSpot = beginLetter + index
  letterblock[currentSpot].style.backgroundColor = 'grey'
}









hghg


const wordOfTheDayURL = 'https://words.dev-apis.com/word-of-the-day'
let dailyWord = ''
async function getWord() {
  const promise = await fetch(wordOfTheDayURL)
  const processedWOD = await promise.json()
  console.log(processedWOD)
  dailyWord = processedWOD.word
}

const checkWordURL = 'https://words.dev-apis.com/validate-word'
let isValid = 0
async function checkWord(word) {
  const promise = await fetch(checkWordURL, {
    method: 'POST',
    body: JSON.stringify({ word: word }),
  })
  const processCWD = await promise.json()
  console.log(processCWD)
  isValid = processCWD.validWord
  return isValid
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter)
}

const beginGame = getWord()

let columnCount = 1
let letterNum = 0
let beginLetter = 0
let testWord = ''
let guessed = []
let rowClass = `.row${columnCount}`

const letterblock = document.getElementsByClassName('letterblock')
const singleblock = document.getElementsByTagName('p')
console.log(singleblock)

document.addEventListener('keydown', function (event) {
  if (!isLetter(event.key)) {
    if (
      event.code === 'Backspace' &&
      letterNum > 0 &&
      letterNum > beginLetter
    ) {
      singleblock[letterNum - 1].innerHTML = ''
      testWord = testWord.slice(0, testWord.length - 1)
      letterblock[letterNum - 1].style.borderColor = 'orange'
      letterNum--
    } else if (event.code === 'Enter') {
      checkAnswer()
    }
  } else {
    if (testWord.length <= 4) {
      singleblock[letterNum].innerHTML = event.key.toString()
      testWord = testWord + event.key.toString()
      letterblock[letterNum].style.borderColor = 'grey'
      letterNum = letterNum + 1
    }
  }
})

async function checkAnswer() {
  if (testWord.length === 5) {
    var resultValid = await checkWord(testWord)
    console.log(isValid)

    // Checking to see if word is valid

    if (isValid) {
      for (let i = 0; i <= testWord.length - 1; i++) {
        turnGrey(i)
        for (let j = 0; j <= dailyWord.length - 1; j++) {
          if (testWord[i] === dailyWord[j]) {
            if (i === j) {
              turnGreen(i)
              guessed.push(testWord[i])
            } else if (i != j) {
              console.log('There are yellows here!')
              turnYellow(i)
              guessed.push(testWord[i])
              console.log(`pushed ${testWord[i]}`)
            }
          }
        }
      }
    } else {
      console.log('Word is invalid!')
      flash()
    }
   checkNextRow();
  }
  guessed = []
}

const turnGreen = function (index) {
  currentSpot = beginLetter + index
  letterblock[currentSpot].style.backgroundColor = 'rgb(0,100,0)'
  singleblock[currentSpot].style.color = 'white'

}

const turnYellow = function (index) {
  if (guessed.includes(testWord[index]) === true) {
    console.log('I am running the if part')
    turnGrey(index)
  } else {
    console.log('I am running the else part')

    guessed.push(testWord[index])
    currentSpot = beginLetter + index
    letterblock[currentSpot].style.backgroundColor = 'rgb(216,165,33)'
    singleblock[currentSpot].style.color = 'white'

  }
}
const turnGrey = function (index) {
  currentSpot = beginLetter + index
  letterblock[currentSpot].style.backgroundColor = 'rgb(136,136,136)'
  singleblock[currentSpot].style.color = 'white'

}

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

const flash = async () => {
  let selected = document.querySelectorAll(rowClass)
  for (i = 0; i <= selected.length - 1; i++) {
    selected[i].style.borderColor = 'red'
    await delay(200)
    selected[i].style.borderColor = 'orange'
  }
}

const checkNextRow = function() {
  if (isValid) {
    if (columnCount < 6) {
      console.log(`You have pressed ENTER ${columnCount} times.`)
  
      beginLetter = letterNum
      columnCount++
      rowClass = `.row${columnCount}`
      testWord = ''
    } else {
      columnCount++
      rowClass = `.row${columnCount}`
      console.log(`You have pressed ENTER ${columnCount} and LOST!`)
    }
  } else {

  }
  
}