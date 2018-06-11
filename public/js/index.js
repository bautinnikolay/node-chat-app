let socket = io()
socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
  let li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`)
  jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function (message) {
  let li = jQuery('<li></li>')
  let link = jQuery('<a target="_blank">See on map</a>').attr('href', message.url)
  li.text(`${message.from}: `)
  li.append(link)
  jQuery('#messages').append(li)
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
