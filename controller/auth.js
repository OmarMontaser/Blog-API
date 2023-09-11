const bcrypt = require("bcrypt")
const User = require('../models/user')

 //Register
 const register =  async(req,res)=>{
        try{

            const salt = await bcrypt.genSalt(10);
            const hashpass = await bcrypt.hash(req.body.password , salt)
            const newUser = new User({
               username: req.body.username,
               email: req.body.email,
               password: req.body.password,
            })
            const user = await newUser.save();
            res.status(201).json(user);           
        }
        catch(err){
            res.status(500).json(err);
        }
 }

 //LogIn

 const login =  async(req , res)=>{
 
    try{    
        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).json("Wrong user!")
        
        if(req.body.password !== user.password)
            res.status(500).json("Wrong Password")
       
            // to make password unvisable in database
       const {password , ...others}  = user._doc 
               res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }

 }

module.exports = {
    login , 
    register
}