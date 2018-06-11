const moment = require('moment')

let createdAt = moment().format('H:mm')

let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt
  }
}

let generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.ru/maps?q=${latitude},${longitude}`,
    createdAt
  }
}

module.exports = {generateMessage, generateLocationMessage}
