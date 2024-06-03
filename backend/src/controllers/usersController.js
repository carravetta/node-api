const usersModel = require("../model/usersModel");

const getAll = async (_req, res)=> {

    const users = await usersModel.getAll();
    return res.status(200).json(users);
  

}

const getOne = async (req, res)=>{
    const user = await usersModel.getOne(req.params.email);
    return res.status(200).json(user);

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

const updateUser = async (req, res)=>{

    const usersUpdated = await usersModel.updateUser(req.params.email, req.body);
    res.status(200).json(usersUpdated);
}

module.exports = {

    getAll, 
    getOne,
    addUser,
    removeUserByEmail,
    removeAll,
    updateUser

};