const usersModel = require("../model/usersModel");

const getAll = async (_req, res)=> {

    const users = await usersModel.getAll();
    return res.status(200).json(users);
  

}

const addUser = async (req, res)=>{

    const newUser = await usersModel.addUser(req.body);
    res.status(200).json(newUser);

}

const removeUserByEmail = async (req, res)=>{
    const removedUser = await usersModel.removeUserByEmail(req.body);
    res.status(200).json(removedUser);
}

const removeAll = async (req, res)=>{

    const removedUsers = await usersModel.removeAll();
    res.status(200).json(removedUsers);
}
module.exports = {

    getAll, 
    addUser,
    removeUserByEmail,
    removeAll

};