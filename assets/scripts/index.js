'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const gameEvents = require('./game/events')
const authEvents = require('./auth/events')
// bind all handlers
const allHandlers = () => {
  gameEvents.addHandlers()
  authEvents.addHandlers()
}

$(() => {
  // load the layout to avoid flicker.
  $('body').load('public/layout.html', allHandlers)
  // console.log('ver. 1.0')
})
