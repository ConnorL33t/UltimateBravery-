
class Users {
    constructor() {
        this.users = []
    }

    addUser({id}) {
        this.users.push(user)
        
        return user;
    }
    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }



}
module.exports = { Users };