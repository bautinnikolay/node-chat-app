const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
const {generateMessage, generateLocationMessage} = require('./utils/message')

let app = express()
let server = http.createServer(app)
let io = socketio(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('This is from the server.')
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

server.listen(port, () => {
  console.log('Start listening on port ' + port)
})
