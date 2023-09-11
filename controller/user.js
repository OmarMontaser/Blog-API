const User = require("../models/user")
const post = require("../models/post")
const bcrypt = require('bcrypt')


// Get 
const getUser =  async(req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password , ...others} = user._doc;
        res.status(200).json(others)

    }catch(err){
        res.status(500).json(err);
        }
}


//Update
const updateUser = async(req , res)=>{

    // we should use JWT Too More Secure ; 
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10) ;
            req.body.password = await bcrypt.hash(req.body.password , salt);
        }
       try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
            $set: req.body,
        },  
            { new: true}
        );
        res.status(200).json(updatedUser);
       }catch(err){
            res.status(500).json(err);
       }

    }else {
        res.status(500).json(`You can update your account Only!`);
    }

}


//Delete
const deleteUser =  async(req,res)=>{
        if(req.body.userId === req.params.id){

            try{
                const user = await User.findById(req.params.id)
                try{
                    await post.deleteMany({username: user.username });
                    await User.findByIdAndDelete(req.params.id);
                    res.status(200).json("User has been Deleted");
                }catch(err){
                    res.status(500).json(err)
                }
            }catch(err){
                res.status(404).json("User not Found!");
            }
        }else {
            res.status(401).json(`You can delete only your Account`)
        }
}

module.exports = {getUser , updateUser , deleteUser} ; 