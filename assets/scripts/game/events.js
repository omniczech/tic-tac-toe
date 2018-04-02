
const api = require('./api')
const ui = require('./ui')
const authUi = require('../auth/ui')
const store = require('../store')

// let turnOrder = 1 DEPRECATED
// const gameBoardArray = ['', '', '', '', '', '', '', '', ''] REMOVED WHEN API WAS WORKING

$('#overlay-sign-tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$('#account-info-tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

const showOutcome = (winner) => {
  $('.overlay').fadeIn()
  $('.results').fadeIn()
  $('.results h2').text(winner)
}

const winCons = (currentLetter, numberOfMoves) => {
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
    const outcome = `${currentLetter.toUpperCase()} Wins!`
    showOutcome(outcome)
    return true
  } else if (numberOfMoves.length === 8) {
    const outcome = 'It\'s a draw'
    showOutcome(outcome)
    console.log('It\'s a draw')
    return true
  }
}

const addLetter = (e) => {
  const arrayPos = $(e.target).attr('data-array-order')
  const numberOfMoves = store.game.cells.filter(space => space.length > 0)
  console.log(numberOfMoves)
  let currentLetter
  let gameOver = false
  if (numberOfMoves.length % 2 === 0) {
    currentLetter = 'x'
  } else {
    currentLetter = 'o'
  }
  // gameBoardArray[arrayPos] = currentLetter
  store.game.cells[arrayPos] = currentLetter
  $(e.target).append(`<h1>${currentLetter}</h1>`)
  $(e.target).off('click', addLetter)
  $(e.target).on('click', invalidMove)
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
  // Check for all possible winning conditions
  gameOver = winCons(currentLetter, numberOfMoves)
  // if (
  //   (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[1] && store.game.cells[1] === store.game.cells[2]) ||
  //   (store.game.cells[3] !== '' && store.game.cells[3] === store.game.cells[4] && store.game.cells[4] === store.game.cells[5]) ||
  //   (store.game.cells[6] !== '' && store.game.cells[6] === store.game.cells[7] && store.game.cells[7] === store.game.cells[8]) ||
  //   (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[3] && store.game.cells[3] === store.game.cells[6]) ||
  //   (store.game.cells[1] !== '' && store.game.cells[1] === store.game.cells[4] && store.game.cells[4] === store.game.cells[7]) ||
  //   (store.game.cells[2] !== '' && store.game.cells[2] === store.game.cells[5] && store.game.cells[5] === store.game.cells[8]) ||
  //   (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[4] && store.game.cells[4] === store.game.cells[8]) ||
  //   (store.game.cells[6] !== '' && store.game.cells[6] === store.game.cells[4] && store.game.cells[4] === store.game.cells[2])
  //
  // ) {
  //   $('.game-space').off('click', addLetter)
  //   console.log(`${currentLetter.toUpperCase()} Wins!`)
  //   gameOver = true
  // } else if (numberOfMoves.length === 8) {
  //   console.log('It\'s a draw')
  //   gameOver = true
  // }
  // $(e.target).removeClass('open')
  // console.log(gameBoardArray)
  console.log(store.game.cells)
  // turnOrder++
  // const newMove = {
  //   'gameID': store.game.id,
  //   'cellIndex': arrayPos,
  //   'cellValue': currentLetter,
  //   'gameOver': gameOver
  // }
  const newMove = {'game': {'cell': {'index': arrayPos, 'value': currentLetter}, 'over': gameOver}}
  console.log(newMove)
  api.updateGameAPI(newMove)
}

const invalidMove = () => {
  console.log('You tried to make an invalid move!')
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append('<p>That space is already taken!</p>')
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}

const newGame = () => {
  api.newGameAPI()
    .then(ui.newGameSuccess)
    .catch(console.log('error'))
  $('.game-space').html('')
  // turnOrder = 1
  // gameBoardArray.forEach(function (part, index, theArray) {
  //   theArray[index] = ''
  // })
  // console.log(gameBoardArray)
  $('.game-space.open').on('click', addLetter)
  $('.overlay').fadeOut()
  $('.first-game').fadeOut()
}

const addHandlers = () => {
  // $('.game-space.open').on('click', addLetter)
  $('.new-game').on('click', newGame)
  $('#closer').on('click', authUi.menuToggle)
}

module.exports = {
  addHandlers
}
