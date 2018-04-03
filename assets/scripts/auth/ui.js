'use strict'

const store = require('../store')

const menuToggle = () => {
  $('.user-info').toggleClass('shown')
}

const signUpSuccess = () => {
  $('#success-message').html('')
  $('#success-message').fadeIn()
  $('#success-message').append('<p>Signed up successfully!<br>Please sign in now.</p>')
  $('input[type="email"], input[type="password"]').val('')
}

const signUpFailure = () => {
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append('<p>Something went wrong.<br>Make sure your password and password confirmation are the same.</p>')
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}

const signInSuccess = (data) => {
  $('#success-message').html('')
  $('#success-message').fadeIn()
  $('#success-message').append('<p>Signed in successfully!</p>')
  setTimeout(function () { $('#success-message').fadeOut() }, 2000)
  store.user = data.user
  // console.log(store.user)
  $('input[type="email"], input[type="password"]').val('')
  $('.panel-sign-in-out').fadeOut()
  $('.new-game').fadeIn()
  $('.user-info').fadeIn()
  $('#message').append('<p>You\'re logged in as ' + store.user.email + '</p>')
  $('#message').append('<button class="show-options">Options</button>')
  $('.show-options').on('click', menuToggle)
  // surface the menu
}

const signInFailure = () => {
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append('<p>Something went wrong.<br>Try entering your email and password again.</p>')
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}

const changePasswordSuccess = (data) => {
  $('#success-message').html('')
  $('#success-message').fadeIn()
  $('#success-message').append('<p>Password changed successfully!</p>')
  setTimeout(function () { $('#success-message').fadeOut() }, 2000)
  $('input[type="email"], input[type="password"]').val('')
}

const changePasswordFailure = (data) => {
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append('<p>Something went wrong.</p>')
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}

const signOutSuccess = () => {
  $('#success-message').html('')
  $('#success-message').fadeIn()
  $('#success-message').append('<p>Signed out successfully!</p>')
  setTimeout(function () { $('#success-message').fadeOut() }, 2000)
  store.user = null
  menuToggle()
  $('#message').html('')
  $('.show-stats').html('')
  $('.overlay').fadeIn()
  $('.panel-sign-in-out').fadeIn()
  $('.new-game').fadeOut()
  $('.announce').fadeOut()
  $('input[type="email"], input[type="password"]').val('')
}

const signOutFailure = () => {
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append('<p>Something went wrong.</p>')
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}

const showGamesSuccess = (data) => {
  // console.log(data)
  $('.show-stats').append('<p>You\'ve played ' + data.games.length + ' Games!</p><hr>')
  const sorted = data.games.sort(function (a, b) {
    return a.id - b.id
  })
  // console.log(sorted)
  sorted.forEach((game) => {
    const winner = winConsOld(game)
    // console.log(game.id)
    const over = game.over ? 'Yes' : 'No'
    $('.show-stats').append(`<p>Game ID: ${game.id}</p><p>Game Completed? ${over}</p><p>Winner: ${winner}</p><hr>`)
  })
}

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
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append('<p>Something went wrong.</p>')
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
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
