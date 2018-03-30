const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')
const api = require('./api')

const onSignUp = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
  console.log(data)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignin = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
  console.log(data)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
  console.log(data)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = (e) => {
  e.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignin)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
}

module.exports = {
  addHandlers
}
