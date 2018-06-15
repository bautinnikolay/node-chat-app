const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {

  let users

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node course'
    }, {
      id: '2',
      name: 'Jane',
      room: 'React course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node course'
    }]
  })

  it('should add new user', () => {
    let users = new Users()
    let user = {
      id: '123',
      name: 'Nikolay',
      room: 'Blablabla'
    }
    let resUser = users.addUser(user.id, user.name, user.room)
    expect(users.users).toEqual([user])
  })

  it('should return names for node course', () => {
    let userList = users.getUserList('Node course')
    expect(userList).toEqual(['Mike', 'Julie'])
  })

  it('should return names for react course', () => {
    let userList = users.getUserList('React course')
    expect(userList).toEqual(['Jane'])
  })

  it('should remove a user', () => {
    let resUser = users.users[0]
    let user = users.removeUser('1')
    expect(user).toEqual(resUser)
  })

  it('should not remove user', () => {
    let user = users.removeUser('99')
    expect(user).toBe(undefined)
  })

  it('should find user', () => {
    let user = users.getUser('2')
    expect(user).toEqual(users.users[1])
  })

  it('should not find user', () => {
    let user = users.getUser('99')
    expect(user).toBe(undefined)
  })
})
