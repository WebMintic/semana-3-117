const config = require('../secret/config.js');
const db = require('../models');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.list = async(req, res, next) =>{
    try{
        const userList = await db.user.findAll();
        res.status(200).json(userList)
    }catch(e){
        next(e);
    }
}

exports.register = async(req, res, next) =>{
    try{
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const newUser = await db.user.create(req.body);
        res.status(200).json(newUser);
    }catch(e){
        next(e);
    }
}

exports.signin = async(req, res, next) =>{
    try{
        const user = await db.user.findOne({ where: {email:req.body.email} })
        if(user){
            const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
            if(passwordIsValid){
                const token = jwt.sign({
                    id:user.id,
                    name: user.name,
                    email: user.email,
                },config.secret,
                {
                    expiresIn: 300
                });
                res.status(200).send({
                    auth: true,
                    accessToken: token,
                    user: user
                });
            }else{
                res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!", user:user });  
            }
        }else{
            res.status(404).send({ auth: false, accessToken: null, reason: "Invalid User!" }); 
        }
    }catch(e){
        res.status(500).send({
            error: 'No se pudo realizar al peticion'
        })
        next(e);
    }
};