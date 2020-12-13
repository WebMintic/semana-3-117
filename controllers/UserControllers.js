const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const request  = require('express');
const models = require('../models');

//Para hacer el login
exports.signin = async (req, res, next) => {
    try{
        const user = await models.user.findOne({where:{email: req.body.email}});
        if(user){
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password); //Validamos que el usuario existe y comparamos la contraseña
            if(passwordIsValid){
                const token = jwt.sign({
                    id: user.id,
                    main: user.name,
                    email: user.email,
                    rol: user.rol
                },'config.secret', { //Puede ser cualquier texto (frase de seguridad)
                    expiresIn: 3600,
                }
                );

                res.status(200).send({
                    auth: true,
                    accessToken: token,
                    user: user
                }); //Se manda el código porque es correcto
            }else{
                res.status(401).json({
                    error:'Datos incorrectos'
            })}
        }else{
            res.status(404).json({
                error:'Datos incorrectos'
            })
        }
    }catch(error){
        res.status(500).send({
            message: 'Error->' + error
        })
        next(error); //Necesario para que no se bloquee la página
    }
};

//Para registrar
exports.register = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};

//Para listar
exports.listar = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};