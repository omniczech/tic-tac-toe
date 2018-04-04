
const api = require('./api')
const ui = require('./ui')
const authUi = require('../auth/ui')
const store = require('../store')

// let turnOrder = 1 DEPRECATED
// const gameBoardArray = ['', '', '', '', '', '', '', '', ''] REMOVED WHEN API WAS WORKING

const addTabHandlers = () => {
  $('#overlay-sign-tabs a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  $('#account-info-tabs a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })
}

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
    $('.game-space').off('click')
    // console.log(`${currentLetter.toUpperCase()} Wins!`)
    const outcome = `${currentLetter.toUpperCase()} Wins!`
    showOutcome(outcome)
    return true
  } else if (numberOfMoves.length === 8) {
    $('.game-space').off('click')
    const outcome = 'It\'s a draw'
    showOutcome(outcome)
    // console.log('It\'s a draw')
    return true
  }
}

const addLetter = (e) => {
  let arrayPos
  // console.log('check for data attr', $(e.target).attr('data-array-order').length )
  if ($(e.target).attr('data-array-order')) {
    arrayPos = $(e.target).attr('data-array-order')
  } else {
    arrayPos = $(e.target).parent().attr('data-array-order')
  }
  const numberOfMoves = store.game.cells.filter(space => space.length > 0)
  // console.log(numberOfMoves)
  let currentLetter
  let gameOver = false
  if (numberOfMoves.length % 2 === 0) {
    currentLetter = 'x'
  } else {
    currentLetter = 'o'
  }
  // gameBoardArray[arrayPos] = currentLetter
  if (store.game.cells[arrayPos].length === 0) {
    store.game.cells[arrayPos] = currentLetter
    $(e.target).append(`<h1>${currentLetter}</h1>`)
    gameOver = winCons(currentLetter, numberOfMoves)
    const newMove = {'game': {'cell': {'index': arrayPos, 'value': currentLetter}, 'over': gameOver}}
    // console.log(newMove)
    api.updateGameAPI(newMove)
  } else {
    invalidMove()
  }
  // $(e.target).off('click', addLetter)

  // console.log(store.game.cells)
  // setTimeout(() => { $(e.target).on('click', invalidMove) }, 1000)
}

const invalidMove = () => {
  // console.log('You tried to make an invalid move!')
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append('<p>That space is already taken!</p>')
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}

const newGame = () => {
  api.newGameAPI()
    .then(ui.newGameSuccess)
    .catch()
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
  console.log('gameevents loaded')
  addTabHandlers()
}

module.exports = {
  addHandlers
}
