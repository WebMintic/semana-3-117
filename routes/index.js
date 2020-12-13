const router = require('express').Router()
const apiRouterUser = require('./api/users.js')

router.use('/auth', apiRouterUser)
router.get('/' ,(req,res) => {
    res.send('estoy en el api')
})
module.exports = router