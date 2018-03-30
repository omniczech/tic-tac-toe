
let turnOrder = 1
const gameBoardArray = ['', '', '', '', '', '', '', '', '']

const addLetter = (e) => {
  const arrayPos = $(e.target).attr('data-array-order')
  let currentLetter
  if (turnOrder % 2 === 1) {
    currentLetter = 'x'
  } else {
    currentLetter = 'o'
  }
  gameBoardArray[arrayPos] = currentLetter
  $(e.target).append(`<h1>${currentLetter}</h1>`)
  $(e.target).off('click')
  if (
    (gameBoardArray[0] !== '' && gameBoardArray[0] === gameBoardArray[1] && gameBoardArray[1] === gameBoardArray[2]) ||
    (gameBoardArray[3] !== '' && gameBoardArray[3] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[5]) ||
    (gameBoardArray[6] !== '' && gameBoardArray[6] === gameBoardArray[7] && gameBoardArray[7] === gameBoardArray[8]) ||
    (gameBoardArray[0] !== '' && gameBoardArray[0] === gameBoardArray[3] && gameBoardArray[3] === gameBoardArray[6]) ||
    (gameBoardArray[1] !== '' && gameBoardArray[1] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[7]) ||
    (gameBoardArray[2] !== '' && gameBoardArray[2] === gameBoardArray[5] && gameBoardArray[5] === gameBoardArray[8]) ||
    (gameBoardArray[0] !== '' && gameBoardArray[0] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[8]) ||
    (gameBoardArray[6] !== '' && gameBoardArray[6] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[2])

  ) {
    $('.game-space').off('click', addLetter)
    console.log(`${currentLetter.toUpperCase()} Wins!`)
  } else if (turnOrder === 9) {
    console.log('It\'s a draw')
  }
  // $(e.target).removeClass('open')
  console.log(gameBoardArray)
  turnOrder++
}

const newGame = () => {
  $('.game-space').html('')
  turnOrder = 1
  gameBoardArray.forEach(function (part, index, theArray) {
    theArray[index] = ''
  })
  console.log(gameBoardArray)
  $('.game-space.open').on('click', addLetter)
}

const addHandlers = () => {
  $('.game-space.open').on('click', addLetter)
  $('.new-game').on('click', newGame)
}

module.exports = {
  addHandlers
}
