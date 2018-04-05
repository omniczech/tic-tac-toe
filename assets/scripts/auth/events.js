const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')
const api = require('./api')

// sign up form submitted
const onSignUp = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
  // console.log(data)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

// sign in form submitted
const onSignin = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
  // console.log(data)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

// change password submitted
const onChangePassword = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
  // console.log(data)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

// sign out submitted
const onSignOut = (e) => {
  e.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

// show games submitted
const onShowGames = (e) => {
  e.preventDefault()
  api.showGames()
    .then(ui.showGamesSuccess)
    .catch(ui.showGamesFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignin)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#show-games').on('submit', onShowGames)
}

module.exports = {
  addHandlers
}
