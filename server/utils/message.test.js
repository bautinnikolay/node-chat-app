const expect = require('expect')

let {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let message = generateMessage('Nikolay', 'Blablalba')
    expect(message.from).toBe('Nikolay')
    expect(message.text).toBe('Blablalba')
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let long = 55.173572199999995
    let lan = 61.352211000000004
    let message = generateLocationMessage('Admin', long, lan)
    expect(message.url).toBe('https://www.google.ru/maps?q='+long+','+lan)
    expect(message.from).toBe('Admin')
  })
})
