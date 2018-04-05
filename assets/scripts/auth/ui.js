'use strict'

const store = require('../store')

const menuToggle = () => {
  // show or hide side menu
  $('.user-info').toggleClass('shown')
}
// Display successful call
const successDisplay = (message) => {
  $('#success-message').html('')
  $('#success-message').fadeIn()
  $('#success-message').append(`<p>${message}</p>`)
  $('input[type="email"], input[type="password"]').val('')
  setTimeout(function () { $('#success-message').fadeOut() }, 2000)
}
// Display unsuccessful call
const failureDisplay = (message) => {
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append(`<p>${message}</p>`)
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}

const signUpSuccess = () => {
  successDisplay('Signed up successfully!<br>Please sign in now.')
}

const signUpFailure = () => {
  failureDisplay('Something went wrong.<br>Make sure your password and password confirmation are the same.')
}

const signInSuccess = (data) => {
  successDisplay('Signed in successfully!')
  store.user = data.user
  // console.log(store.user)
  $('.panel-sign-in-out').fadeOut()
  $('.new-game').fadeIn()
  $('.user-info').fadeIn()
  $('#message').append('<p>You\'re logged in as ' + store.user.email + '</p>')
  $('#message').append('<button class="show-options">Options</button>')
  $('.show-options').on('click', menuToggle)
  // surface the menu
}

const signInFailure = () => {
  failureDisplay('Something went wrong.<br>Try entering your email and password again.')
}

const changePasswordSuccess = (data) => {
  successDisplay('Password changed successfully!')
}

const changePasswordFailure = (data) => {
  failureDisplay('Something went wrong.')
}

const signOutSuccess = () => {
  successDisplay('Signed out successfully!')
  // clear game and user info
  store.user = null
  store.game = null
  // reset to initial view
  menuToggle()
  $('#message').html('')
  $('.show-stats').html('')
  $('.overlay').fadeIn()
  $('.panel-sign-in-out').fadeIn()
  $('.new-game').fadeOut()
  $('.announce').fadeOut()
  $('input[type="email"], input[type="password"]').val('')
  $('.game-space').off('click')
  $('.game-space').html('')
}

const signOutFailure = () => {
  failureDisplay('Something went wrong.')
}

const showGamesSuccess = (data) => {
  // clear div
  $('.show-stats').html('')
  // sort all games by ID ascending
  $('.show-stats').append('<p>You\'ve played ' + data.games.length + ' Games!</p><hr>')
  const sorted = data.games.sort(function (a, b) {
    return a.id - b.id
  })
  // print all sorted games
  sorted.forEach((game) => {
    const winner = winConsOld(game)
    // console.log(game.id)
    const over = game.over ? 'Yes' : 'No'
    $('.show-stats').append(`<p>Game ID: ${game.id}</p><p>Game Completed? ${over}</p><p>Winner: ${winner}</p><hr>`)
  })
}

// figure out winner of finished game.
const winConsOld = (loopvar) => {
  if (
    (loopvar.cells[0] === 'x' && loopvar.cells[0] === loopvar.cells[1] && loopvar.cells[1] === loopvar.cells[2]) ||
    (loopvar.cells[3] === 'x' && loopvar.cells[3] === loopvar.cells[4] && loopvar.cells[4] === loopvar.cells[5]) ||
    (loopvar.cells[6] === 'x' && loopvar.cells[6] === loopvar.cells[7] && loopvar.cells[7] === loopvar.cells[8]) ||
    (loopvar.cells[0] === 'x' && loopvar.cells[0] === loopvar.cells[3] && loopvar.cells[3] === loopvar.cells[6]) ||
    (loopvar.cells[1] === 'x' && loopvar.cells[1] === loopvar.cells[4] && loopvar.cells[4] === loopvar.cells[7]) ||
    (loopvar.cells[2] === 'x' && loopvar.cells[2] === loopvar.cells[5] && loopvar.cells[5] === loopvar.cells[8]) ||
    (loopvar.cells[0] === 'x' && loopvar.cells[0] === loopvar.cells[4] && loopvar.cells[4] === loopvar.cells[8]) ||
    (loopvar.cells[6] === 'x' && loopvar.cells[6] === loopvar.cells[4] && loopvar.cells[4] === loopvar.cells[2])

  ) {
    // const outcome = `${currentLetter.toUpperCase()} Wins!`
    // console.log('X won!')
    return 'X'
  } else if (
    (loopvar.cells[0] === 'o' && loopvar.cells[0] === loopvar.cells[1] && loopvar.cells[1] === loopvar.cells[2]) ||
    (loopvar.cells[3] === 'o' && loopvar.cells[3] === loopvar.cells[4] && loopvar.cells[4] === loopvar.cells[5]) ||
    (loopvar.cells[6] === 'o' && loopvar.cells[6] === loopvar.cells[7] && loopvar.cells[7] === loopvar.cells[8]) ||
    (loopvar.cells[0] === 'o' && loopvar.cells[0] === loopvar.cells[3] && loopvar.cells[3] === loopvar.cells[6]) ||
    (loopvar.cells[1] === 'o' && loopvar.cells[1] === loopvar.cells[4] && loopvar.cells[4] === loopvar.cells[7]) ||
    (loopvar.cells[2] === 'o' && loopvar.cells[2] === loopvar.cells[5] && loopvar.cells[5] === loopvar.cells[8]) ||
    (loopvar.cells[0] === 'o' && loopvar.cells[0] === loopvar.cells[4] && loopvar.cells[4] === loopvar.cells[8]) ||
    (loopvar.cells[6] === 'o' && loopvar.cells[6] === loopvar.cells[4] && loopvar.cells[4] === loopvar.cells[2])

  ) {
    // const outcome = `${currentLetter.toUpperCase()} Wins!`
    // console.log('O won!')
    return 'O'
  } else if (loopvar.cells.length === 9 && loopvar.over) {
    // const outcome = 'It\'s a draw'
    // console.log('Noone won!')
    return 'No One (Draw)'
  } else {
    return 'No One (Unfinished)'
  }
}

const showGamesFailure = () => {
  failureDisplay('Something went wrong.')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordFailure,
  changePasswordSuccess,
  signOutSuccess,
  signOutFailure,
  showGamesFailure,
  showGamesSuccess,
  menuToggle
}
