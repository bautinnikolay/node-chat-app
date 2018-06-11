let socket = io()

function scrollToBottom() {
  //Selectors
  let messages = jQuery('#messages')
  let newMessage = messages.children('li:last-child')
  //Heights
  let clientHeight = messages.prop('clientHeight')
  let scrollTop = messages.prop('scrollTop')
  let scrollHeight= messages.prop('scrollHeight')
  let newMessageHeight = newMessage.innerHeight()
  let lastMessageHeight = newMessage.prev().innerHeight()

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
  let template = jQuery('#message-template').html()
  let html = Mustache.render(template, {
    createdAt: message.createdAt,
    from: message.from,
    text: message.text
  })
  jQuery('#messages').append(html)
  scrollToBottom()
})

socket.on('newLocationMessage', function (message) {
  let template = jQuery('#location-message-template').html()
  let html = Mustache.render(template, {
    createdAt: message.createdAt,
    from: message.from,
    url: message.url
  })
  jQuery('#messages').append(html)
  scrollToBottom()
})

jQuery('#message-form').on('submit', function(e) {
  let messageTextbox = jQuery('[name=message]')
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('')
  })
})

let locationButton = jQuery('#send-location')
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }
  locationButton.attr('disabled', 'disabled').text('Sending...')
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location')
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function() {
    locationButton.removeAttr('disabled').text('Send location')
    alert('Unable to fetch location')
  })
})
