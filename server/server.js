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

  socket.emit('newMessage', {
    from: "Some user",
    text: "Blablabla",
    createdAt: 123
  })

  socket.on('createMessage', (message) => {
    console.log("create email", message)
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

server.listen(port, () => {
  console.log('Start listening on port ' + port)
})
