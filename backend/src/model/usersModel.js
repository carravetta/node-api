const Datastore = require("nedb");
const User = require("./User");
const dbConfig = ()=>{ 

    const db = new Datastore({
    filename: "users.db",
    autoload: true
    });

    return db;
}

const getAll = () =>{

    return new Promise((resolve, reject)=>{
        const db = dbConfig();
        db.find({}).exec((err, users)=>{
            if(err){
                console.log(`ERRO DE BANCO DE DADOS: ${err}`);
                reject(err)
            }else{
                
                    console.log(`Usuarios Encontrados: ${JSON.stringify(users)}`);
                    resolve(users);
            }
        });
    });
  }

const addUser = (newUser)=>{
    const db = dbConfig();
    var user = new User(newUser.name, newUser.age, newUser.email);
    return new Promise((resolve, reject)=>{
      
        db.insert({user}, (err, user)=>{

            if(err){
                console.log(err);
                reject(err)
            }else{
                console.log("Usuario adicionado", user);
                resolve(user)
            }
    
        });
    })
}

const findOne = (userEmail)=>{
    const db = dbConfig();

    return new Promise((resolve, reject)=>{

        db.findOne({_email: userEmail.email}, (err, user)=>{
            console.log("USER: "+user)
            if(err){
                reject(userEmail)
            }else{
                newUser = new User(user.name, user.age, user.email);
                resolve(newUser);
            }
        });

    });
}

const removeUser = (userEmail)=>{

    const db = dbConfig();
    console.log(userEmail._email);
    var user = findOne(userEmail);
    return new Promise((resolve, reject)=>{

        db.remove({user}, {}, (err)=>{

            if(err){
                console.log("usuario não encontrado");
                reject(err)
            }else{
                console.log(`Usuario do email ${userEmail} removido com sucesso` );
                resolve(user.email);
            }
        });

    });

}

module.exports = {
    getAll,
    dbConfig,
    addUser,
    removeUser
}