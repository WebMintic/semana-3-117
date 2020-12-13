const router = require('express').Router();
const apiRouterUser = require('./apis/users.js');

router.use('/auth', apiRouterUser); // .com/api/user

module.exports = router;