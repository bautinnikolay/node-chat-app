const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')

let app = express()
let server = http.createServer(app)
let io = socketio(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('Hello new user')

  socket.emit('greatingMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app'
  })

  socket.broadcast.emit('newConnectionMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
    console.log("create message", message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
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
