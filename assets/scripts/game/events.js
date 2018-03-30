
let turnOrder = 1

const addLetter = (e) => {
  if (turnOrder % 2 === 1) {
    $(e.target).append('<p>X</p>')
  } else {
    $(e.target).append('<p>O</p>')
  }
  $(e.target).removeClass('open')
  turnOrder++
}

const addHandlers = () => {
  $('.game-space.open').on('click', addLetter)
}

module.exports = {
  addHandlers
}
