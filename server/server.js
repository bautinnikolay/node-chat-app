const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
const {generateMessage} = require('./utils/message')

let app = express()
let server = http.createServer(app)
let io = socketio(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('Hello new user')

  socket.emit('greatingMessage', generateMessage('Admin', 'Welcome to chat app'))

  socket.broadcast.emit('newConnectionMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (message) => {
    console.log("create message", message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

server.listen(port, () => {
  console.log('Start listening on port ' + port)
})
