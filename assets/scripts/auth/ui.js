'use strict'

const store = require('../store')

const menuToggle = () => {
  $('.user-info').toggleClass('shown')
}

const signUpSuccess = () => {
  $('#success-message').html('')
  $('#success-message').fadeIn()
  $('#success-message').append('<p>Signed up successfully!<br>Please sign in now.</p>')
  $('#sign-up input[type="email"], #sign-up input[type="password"]').val('')
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
  $('#sign-in input[type="email"], #sign-in input[type="password"]').val('')
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
  $('.overlay').fadeIn()
  $('.panel-sign-in-out').fadeIn()
  $('.new-game').fadeOut()
  $('.announce').fadeOut()
}

const signOutFailure = () => {
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append('<p>Something went wrong.</p>')
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}

const showGamesSuccess = (data) => {
  // console.log(data)
  $('.show-stats').text('You\'ve played ' + data.games.length + ' Games!')
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
