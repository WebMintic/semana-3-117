const router = require('express').Router()
const userController = require('../../controllers/MiController')

router.get('/' , userController.list);
router.post('/register' , userController.register);

router.post('/signin', userController.signin)

module.exports = router