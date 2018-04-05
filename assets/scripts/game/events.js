
const api = require('./api')
const ui = require('./ui')
const authUi = require('../auth/ui')
const store = require('../store')

const addTabHandlers = () => {
  // set up tab functionality from bootstrap
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
  // display win or draw message
  $('.overlay').fadeIn()
  $('.results').fadeIn()
  $('.results h2').text(winner)
  $('.results h2').fadeIn()
}

const winCons = (currentLetter, numberOfMoves) => {
  // check if a win condition is met
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
    // unbind all spaces
    $('.game-space').off('click')
    // set winner message
    const outcome = `${currentLetter.toUpperCase()} Wins!`
    showOutcome(outcome)
    return true
  } else if (numberOfMoves.length === 8) { // check if the game is a draw
    // unbind all spaces
    $('.game-space').off('click')
    const outcome = 'It\'s a draw'
    showOutcome(outcome)
    // console.log('It\'s a draw')
    return true
  }
}

const addLetter = (e) => {
  let arrayPos
  // figure out if user clicked the box or a child
  if ($(e.target).attr('data-array-order')) {
    arrayPos = $(e.target).attr('data-array-order')
  } else {
    arrayPos = $(e.target).parent().attr('data-array-order')
  }
  // Figure out how many moves have been maded.
  const numberOfMoves = store.game.cells.filter(space => space.length > 0)
  // declare empty variable
  let currentLetter
  // Set gameOver to false (will be overridden if necessary)
  let gameOver = false
  // using number of moves, figure out whose turn it is
  if (numberOfMoves.length % 2 === 0) {
    currentLetter = 'x'
  } else {
    currentLetter = 'o'
  }
  // if the space is empty
  if (store.game.cells[arrayPos].length === 0) {
    // update local array
    store.game.cells[arrayPos] = currentLetter
    // update DOM
    $(e.target).append(`<h1>${currentLetter}</h1>`)
    // check to see if someone won.
    gameOver = winCons(currentLetter, numberOfMoves)
    // create object for API
    const newMove = {'game': {'cell': {'index': arrayPos, 'value': currentLetter}, 'over': gameOver}}
    // send most recent move to the API
    api.updateGameAPI(newMove)
  } else { // if space isn't empty
    invalidMove()
  }
}

const invalidMove = () => {
  // show error for invalid move
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append('<p>That space is already taken!</p>')
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}

const newGame = () => {
  // make call to API for new Game Object
  api.newGameAPI()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
  // reset game spaces
  $('.game-space').html('')
  // rebind addLetter
  $('.game-space.open').on('click', addLetter)
  // fadeOut the overlay
  $('.overlay').fadeOut()
  // fadeOut the first game button
  $('.first-game').fadeOut()
}

const addHandlers = () => {
  $('.new-game').on('click', newGame)
  $('#closer').on('click', authUi.menuToggle)
  addTabHandlers()
}

module.exports = {
  addHandlers
}
