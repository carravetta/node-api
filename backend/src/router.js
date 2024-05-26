const express= require(`express`);
const usersController = require("./controllers/usersController");
const usersMiddleware = require('./middlewares/usersMiddleware');
const router = express.Router();

router.get(`/users`, usersController.getAll);
router.get(`/users/:email`, usersController.getOne);
router.post('/users', usersMiddleware.validadeUser,usersController.addUser);
router.put('/users/:email', usersMiddleware.validadeUser, usersController.updateUser);
router.delete('/users', usersController.removeUserByEmail);
router.delete('/users/deleteall', usersController.removeAll);

module.exports = router;
//min 21:30
//https://www.youtube.com/watch?v=Cdu0WJhI-d8&t=1194s