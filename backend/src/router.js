const express= require(`express`);
const usersController = require("./controllers/usersController")
const router = express.Router();

router.get(`/users`, usersController.getAll);
router.post('/users', usersController.addUser);

module.exports = router;
//min 21:30
//https://www.youtube.com/watch?v=Cdu0WJhI-d8&t=1194s