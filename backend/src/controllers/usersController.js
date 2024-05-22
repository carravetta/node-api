const usersModel = require("../model/usersModel");

const getAll = async (_req, res)=> {

    const users = await usersModel.getAll();
    return res.status(200).json(users);
  

}

const addUser = async (req, res)=>{

    const newUser = await usersModel.addUser(req.body);
    res.status(200).json(newUser);

}
module.exports = {

    getAll,
    addUser

};