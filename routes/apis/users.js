const router = require('express').Router();
const model = require('../../models');
const userController = require ('../../controllers/UserControllers.js');
const bcrypt = require('bcryptjs');

//.com/api/user
router.get('/', async(req, res) =>{
    const user = await model.user.findAll();
    res.status(200).json(user); //Como respuesta se envía el usuario hallado
});

//.com/api/user/register
router.post('/register', async(req, res) => { //Para enviar datos
    req.body.password = await bcrypt.hashSync(req.body.password, 12); //Algoritmo de cifrado de la contraseña con 10 repeticiones
    const user = await model.user.create(req.body);
    res.status(200).json(user); //Como respuesta se envía el usuario creado
});

// router.get('/', userController.login);
// router.post('/register', userController.register); //Lógica que se envía al controlador

router.post('/signin', userController.signin); //Lógica que se envía al controlador

module.exports = router;

