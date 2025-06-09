// creating authentication logic for login and signup
const UserModel = require('../Models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email});
        if (user){
            return res.status(409).json({
                message : "User already exists Please Login",success : false
            })
        }
        const newUser = new UserModel({name,email,password});
        // hashing the password using bcrypt
        newUser.password = await bcrypt.hash(password,10);
        await newUser.save();
        return res.status(201).json({
            message: "User created successfully",
            success: true,

        })


    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,

        })
        
    }
}

// creating a login function
const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const User = await UserModel.findOne({email});
        if (!User){
            return res.status(401).json({
                message : "Please signup first",
                success : false
            })
        }
        const PassEqual = await bcrypt.compare(password,User.password);
        if(!PassEqual){
            return res.status(401).json({
                message : "Password is incorrect",
                success : false
            })

        }
        // creating a token using jwt for authentication 
        const jwtToken = jwt.sign({email: User.email,_id: User._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        return res.status(200).json({
            message: "Login Sucessfully",
            success: true,
            jwtToken,
            email,
            name: User.name,
        })

        
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            sucess : false
        })
        
    }
}

module.exports = {
    signup,
    login
}
