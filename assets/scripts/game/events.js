
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

let turnOrder = 1
// const gameBoardArray = ['', '', '', '', '', '', '', '', '']

const addLetter = (e) => {
  const arrayPos = $(e.target).attr('data-array-order')
  let currentLetter
  let gameOver = false
  if (turnOrder % 2 === 1) {
    currentLetter = 'x'
  } else {
    currentLetter = 'o'
  }
  // gameBoardArray[arrayPos] = currentLetter
  store.game.cells[arrayPos] = currentLetter
  $(e.target).append(`<h1>${currentLetter}</h1>`)
  $(e.target).off('click')
  // if (
  //   (gameBoardArray[0] !== '' && gameBoardArray[0] === gameBoardArray[1] && gameBoardArray[1] === gameBoardArray[2]) ||
  //   (gameBoardArray[3] !== '' && gameBoardArray[3] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[5]) ||
  //   (gameBoardArray[6] !== '' && gameBoardArray[6] === gameBoardArray[7] && gameBoardArray[7] === gameBoardArray[8]) ||
  //   (gameBoardArray[0] !== '' && gameBoardArray[0] === gameBoardArray[3] && gameBoardArray[3] === gameBoardArray[6]) ||
  //   (gameBoardArray[1] !== '' && gameBoardArray[1] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[7]) ||
  //   (gameBoardArray[2] !== '' && gameBoardArray[2] === gameBoardArray[5] && gameBoardArray[5] === gameBoardArray[8]) ||
  //   (gameBoardArray[0] !== '' && gameBoardArray[0] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[8]) ||
  //   (gameBoardArray[6] !== '' && gameBoardArray[6] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[2])
  //
  // )
  if (
    (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[1] && store.game.cells[1] === store.game.cells[2]) ||
    (store.game.cells[3] !== '' && store.game.cells[3] === store.game.cells[4] && store.game.cells[4] === store.game.cells[5]) ||
    (store.game.cells[6] !== '' && store.game.cells[6] === store.game.cells[7] && store.game.cells[7] === store.game.cells[8]) ||
    (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[3] && store.game.cells[3] === store.game.cells[6]) ||
    (store.game.cells[1] !== '' && store.game.cells[1] === store.game.cells[4] && store.game.cells[4] === store.game.cells[7]) ||
    (store.game.cells[2] !== '' && store.game.cells[2] === store.game.cells[5] && store.game.cells[5] === store.game.cells[8]) ||
    (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[4] && store.game.cells[4] === store.game.cells[8]) ||
    (store.game.cells[6] !== '' && store.game.cells[6] === store.game.cells[4] && store.game.cells[4] === store.game.cells[2])

  ) {
    $('.game-space').off('click', addLetter)
    console.log(`${currentLetter.toUpperCase()} Wins!`)
    gameOver = true
  } else if (turnOrder === 9) {
    console.log('It\'s a draw')
    gameOver = true
  }
  // $(e.target).removeClass('open')
  // console.log(gameBoardArray)
  console.log(store.game.cells)
  turnOrder++
  // const newMove = {
  //   'gameID': store.game.id,
  //   'cellIndex': arrayPos,
  //   'cellValue': currentLetter,
  //   'gameOver': gameOver
  // }
  const newMove = {'game': {'cell': {'index': arrayPos, 'value': currentLetter}, 'over': gameOver}}
  console.log(newMove)
  console.log(typeof newMove)
  api.updateGameAPI(newMove)
}

const newGame = () => {
  api.newGameAPI()
    .then(ui.newGameSuccess)
    .catch(console.log('error'))
  $('.game-space').html('')
  turnOrder = 1
  // gameBoardArray.forEach(function (part, index, theArray) {
  //   theArray[index] = ''
  // })
  // console.log(gameBoardArray)
  $('.game-space.open').on('click', addLetter)
}

const addHandlers = () => {
  // $('.game-space.open').on('click', addLetter)
  $('.new-game').on('click', newGame)
}

module.exports = {
  addHandlers
}
