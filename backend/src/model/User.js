class User{

    constructor (name, age, email){

        this._name = name;
        this._age = age;
        this._email = email;

    }

    get name(){
        return this._name;
    }

    get age(){
        return this._age;
    }

    get email(){
        return this._email;
    }

}

module.exports = User;
