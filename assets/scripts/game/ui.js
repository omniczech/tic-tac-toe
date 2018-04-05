const store = require('../store')

// display new game has been started
const newGameSuccess = (data) => {
  $('#success-message').html('')
  $('#success-message').fadeIn()
  $('#success-message').append('<p>New game started!</p>')
  setTimeout(function () { $('#success-message').fadeOut() }, 2000)
  // store new game in store.js
  store.game = data.game
  // console.log(data)
}
// show error creating new games
const newGameFailure = (data) => {
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append('<p>Failed to create new game, please try again!</p>')
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}
module.exports = {
  newGameSuccess,
  newGameFailure
}
