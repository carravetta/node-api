const Datastore = require("nedb");
const User = require("./User");

    const db = new Datastore({
    filename: "users.db",
    autoload: true
    });


const getAll = () =>{

    return new Promise((resolve, reject)=>{
        
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

const getOne = (email) =>{

    return new Promise((resolve, reject)=>{
        
        db.findOne({_email: email}, (err, user)=>{
            if(err){
                console.log(`ERRO DE BANCO DE DADOS: ${err}`);
                reject(err)
            }else{
                    console.log(`Usuario Encontrados: ${JSON.stringify(user)}`);
                    resolve(user);
            }
        });
    });    

}

const addUser = (newUser)=>{
    
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
    });
}

const removeUserByEmail = (userEmail)=>{
    
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
    });
}

module.exports = {
    getAll,
    getOne,
    addUser,
    removeUserByEmail,
    removeAll
}