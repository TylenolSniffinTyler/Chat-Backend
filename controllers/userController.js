const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const createToken = (_id) =>{
    return  jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}


//*Function that signs up a user
const signup = async function(req, res){
    const {username, email, password}= req.body
    try{
        const signup = await User.signup(username, email, password)
        //create a jwt token
        const token =  createToken(signup._id)
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//*Function that logs in a user
const login = async function(req, res){
    const {email, password} = req.body
    try{
        const login = await User.login(email, password)
        //create a jwt token
        const token =  createToken(login._id)
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signup , login}