const store = require('../store')

const newGameSuccess = (data) => {
  $('#message').fadeIn()
  $('#message').text('New Game Success!')
  $('#message').addClass('success')
  $('#message').removeClass('failure')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
  store.game = data.game
  console.log(data)
}
module.exports = {
  newGameSuccess
}
