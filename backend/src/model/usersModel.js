const Datastore = require("nedb");
const User = require("./User");

    const db = new Datastore({
    filename: "users.db",
    autoload: true
    });


const getAll = async () =>{

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

const getOne = async (email) =>{

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

const addUser = async (newUser)=>{
    
    var user = new User(newUser.name, newUser.age, newUser.email);
    verificaEmail = await getOne(user.email);

    if(verificaEmail != null){
        console.log(`O usuário com o e-mail ${newUser.email} já existe.`);
        return `O usuário com o e-mail ${newUser.email} já existe.`; 
    }

    console.log("---VERIFICA EMAIL---", verificaEmail);
    
    return new Promise((resolve, reject)=>{
    
        db.insert(user, (err, user)=>{

            if(err){
                console.log(err);
                reject(err)
            }else{
                console.log(`Usuario adicionado ${JSON.stringify(user)}`);
                resolve(user)
            }
    
        });
    });
}


const removeUserByEmail = async (userEmail)=>{
    
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

const removeAll = async ()=>{

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

const updateUser = async (email, userUpdated)=>{
    
    return new Promise((resolve, reject)=>{
        const newUser = new User (userUpdated.name, userUpdated.age, userUpdated.email);    
        db.update({_email: email}, {$set: newUser}, (err)=>{

            if(err){
                console.log(err);
                reject(err)
            }else{
                console.log("Usuario atualizado", newUser);
                resolve(newUser)
            }
        });
    });
}

module.exports = {
    getAll,
    getOne,
    addUser,
    removeUserByEmail,
    removeAll,
    updateUser
}