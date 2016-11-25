const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'mike',
            room: 'Node JS'
        }, {
            id: '2',
            name: 'conyayo',
            room: 'Node JS'
        }, {
            id: '3',
            name: 'tryndamere',
            room: 'ReactJS'
        }

        ]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Connor',
            room: 'The Office Fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    // get user tests
    it('should return names of room Node JS', () => {
        var userList = users.getUserList('Node JS');

        expect(userList).toEqual(['mike', 'conyayo'])
    });
    it('should return names of room ReactJS', () => {
        var userList = users.getUserList('ReactJS');

        expect(userList).toEqual(['tryndamere'])
    });
    // remove user tests   
    it('it should remove user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId)
        expect(users.users.length).toBe(2);
    });

    it('it should not remove user not in userlist', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3)
    });
    // other tests
    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });


})