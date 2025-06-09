const { request } = require('express');
const joi = require('joi');
const SignUpValidation = (req,res,next)=>{
    const Schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email : joi.string().email().required(),
        password : joi.string().min(6).max(30).required(),
    })
    const {error} = Schema.validate(req.body);
    if (error){
        return res.status(400).json({
            message : "Bad Request", error
        })
    }
    next()

}

const loginValidation = (req,res,next)=>{
    const Schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().min(6).max(30).required(),
    });
    const {error} = Schema.validate(req.body);
    if (error){
        return res.status(400).json({
            message : "Bad Request", error
        })
    }
    next();

}
module.exports = {
    SignUpValidation,
    loginValidation
}
