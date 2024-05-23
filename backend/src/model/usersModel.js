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
      
        db.insert(user, (err, user)=>{

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

const removeUserByEmail = (userEmail)=>{

    const db = dbConfig();
    
    return new Promise((resolve, reject)=>{

        db.remove({_email: userEmail.email}, {}, (err)=>{

            if(err){
                console.log("usuario não encontrado");
                reject(err)
            }else{
                console.log(`Usuario do email ${userEmail} removido com sucesso` );
                resolve(userEmail);
            }
        });

    });

}

const removeAll = ()=>{

    const db = dbConfig();

    return new Promise((resolve, reject)=>{
        db.remove({}, {multi: true}, (err, numRemoved)=>{

            if(err){
                console.log("Nenhum usuario encontrado");
                reject(err)
            }else{
                console.log(`${numRemoved} usuairos removidos com sucesso` );
                resolve(numRemoved);
            }
        })
    })

}

module.exports = {
    getAll,
    dbConfig,
    addUser,
    removeUserByEmail,
    removeAll
}