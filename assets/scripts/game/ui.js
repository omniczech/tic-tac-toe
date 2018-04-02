const store = require('../store')

const newGameSuccess = (data) => {
  $('#success-message').html('')
  $('#success-message').fadeIn()
  $('#success-message').append('<p>New game started!</p>')
  setTimeout(function () { $('#success-message').fadeOut() }, 2000)
  store.game = data.game
  // console.log(data)
}
module.exports = {
  newGameSuccess
}
