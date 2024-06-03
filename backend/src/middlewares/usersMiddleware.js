const Ajv  = require('ajv');
const userModel = require('../model/usersModel');

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

const uniqueEmail = (req, res, next) => {
    
    const {body} = req;

    
    verificaEmail = usersModel.getOne(email)

    if(verificaEmail == null){
        return res.status(200).json({message: `O usuário com o e-mail ${newUser.email} já existe.`});;
    }
    next();
}

module.exports = {

validadeUser,
uniqueEmail
}