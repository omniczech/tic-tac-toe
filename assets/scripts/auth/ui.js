'use strict'

const store = require('../store')

const signUpSuccess = () => {
  $('#message').fadeIn()
  $('#message').text('Successfully signed up!')
  $('#message').addClass('success')
  $('#message').removeClass('failure')
  $('#sign-up input[type="email"], #sign-up input[type="password"]').val('')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const signUpFailure = () => {
  $('#message').fadeIn()
  $('#message').text('Failure signing up!')
  $('#message').addClass('failure')
  $('#message').removeClass('success')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const signInSuccess = (data) => {
  $('#message').fadeIn()
  $('#message').text('Successfully signed in!')
  $('#message').addClass('success')
  $('#message').removeClass('failure')
  store.user = data.user
  console.log(store.user)
  $('#sign-in input[type="email"], #sign-in input[type="password"]').val('')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
  $('.panel-sign-in-out').fadeOut()
  $('.new-game').fadeIn()
}

const signInFailure = () => {
  $('#message').fadeIn()
  $('#message').text('Failure signing in!')
  $('#message').addClass('failure')
  $('#message').removeClass('success')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const changePasswordSuccess = (data) => {
  $('#message').fadeIn()
  $('#message').text('Password changed Successfully!')
  $('#message').addClass('success')
  $('#message').removeClass('failure')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const changePasswordFailure = (data) => {
  $('#message').fadeIn()
  $('#message').text('Password change Failed!')
  $('#message').addClass('failure')
  $('#message').removeClass('success')
  console.log(data)
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const signOutSuccess = () => {
  $('#message').fadeIn()
  $('#message').text('Signed Out Successfully!')
  store.user = null
  $('#message').addClass('success')
  $('#message').removeClass('failure')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const signOutFailure = () => {
  $('#message').fadeIn()
  $('#message').text('Signing Out Failed!')
  $('#message').addClass('failure')
  $('#message').removeClass('success')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const showGamesSuccess = (data) => {
  console.log(data)
  $('#message').fadeIn()
  $('#message').text('You\'ve played ' + data.games.length + ' Games!')
  $('#message').addClass('success')
  $('#message').removeClass('failure')
}

const showGamesFailure = () => {
  $('#message').fadeIn()
  $('#message').text('Showing Games Failed!')
  $('#message').addClass('failure')
  $('#message').removeClass('success')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
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
  showGamesSuccess
}
