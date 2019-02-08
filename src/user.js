export default class User {
    
    constructor(username) {
        if (!User.instance) {
            this.username = username;
            this.loggedIn = true;
            Counter.instance=this;
        }
        return User.instance;
    }

    add() {
        
    }

}