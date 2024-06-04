const Ajv  = require('ajv');
const usersModel = require('../model/usersModel');

const validadeUser = (req, res, next)=>{
   
    const {body} = req;

    const schema = {

        "type": "object",
        "properties": {
            "name":{"type": "string"},
            "age":{ "type": "integer", "minimum" : 1},
            "email": { "pattern": "^\\S+@\\S+\\.\\S+$"},
        },
        "required": ["name", "age", "email"]
    };
    
    const ajv = new Ajv();
    const valida = ajv.compile(schema);
    const isValido = valida(body);

    if(!isValido){
        return res.status(400).json({message: 'Usuario invalido, verifique os campos!'});
    }
    next();

}

const uniqueEmail = async (req, res, next) => {
        
    const {body} = req

    if(req.params.email != null){
        const emailParam = await usersModel.getOne(req.params.email);
        if(emailParam == null){
            return res.status(200).json({message: `O usuário com o e-mail ${req.params.email} não cadastrado.`});
        }
    }

    const verificaEmail = await usersModel.getOne(body.email);
    console.log("VERIFICA EMAIL: ", verificaEmail);
    if(verificaEmail != null){
        console.log("UNIQUEEMAIL", body.email);
    
        return res.status(200).json({message: `O usuário com o e-mail ${body.email} já existe.`});
    }
    next();
}

const uniqueEmailToRemove = async (req, res, next) => {
        
    const {body} = req

    const verificaEmail = await usersModel.getOne(body.email);
    console.log("VERIFICA EMAIL: ", verificaEmail);
    if(verificaEmail == null){
        console.log("UNIQUEEMAIL", body.email);
    
        return res.status(200).json({message: `Usuário com o e-mail ${body.email} não encontrado.`});
    }
    next();
}


module.exports = {

validadeUser,
uniqueEmail,
uniqueEmailToRemove
}