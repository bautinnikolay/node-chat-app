const expect = require('expect')

let {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', (done) => {
    let message = generateMessage('Nikolay', 'Blablalba')
    expect(message.from).toBe('Nikolay')
    expect(message.text).toBe('Blablalba')
    expect(message.createdAt).toBeLessThanOrEqual(new Date().getTime())
    done()
  })
})
