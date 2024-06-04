const express= require(`express`);
const usersController = require("./controllers/usersController");
const usersMiddleware = require('./middlewares/usersMiddleware');
const router = express.Router();

router.get(`/users`, usersController.getAll);
router.get(`/users/:email`, usersController.getOne);
router.post('/users', usersMiddleware.validadeUser,usersMiddleware.uniqueEmail, usersController.addUser);
router.put('/users/:email', usersMiddleware.validadeUser,usersMiddleware.uniqueEmail, usersController.updateUser);
router.delete('/users', usersMiddleware.uniqueEmailToRemove, usersController.removeUserByEmail);
router.delete('/users/deleteall', usersController.removeAll);

module.exports = router;
