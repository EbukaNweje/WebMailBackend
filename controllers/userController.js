const userModel = require("../models/userModel")
require("dotenv").config()
const jwt = require("jsonwebtoken")




// Register user function
exports.loginUser = async(req,res)=>{
    try {

        // get the requirement for the registration
        const {email, detail }  = req.body


        // register the user
        const newUser = await userModel.create({
            email,
            detail
        })
        // generate a token for the user 
        const token = jwt.sign({
            userId:newUser._id,
            email:newUser.email,
        },process.env.JWT_KEY,{expiresIn:"6000s"})

       await newUser.save()

       if(!newUser){
            return res.status(400).json({
                error:"error"
            })
        }
        // success message
        res.status(200).json({
            message:`successful`,
            data: newUser,
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}


exports.getAllUsers = async (req, res) =>{
    try{

        const users = await userModel.find()

        if(users.length === 0)
        return res.status(404).json({
            error: `You have 0 users`
        })
        res.status(200).json({
            message: `You have ${users.length} users here`,
            data:users
        })

    }
    catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}


exports.deleteOne = async (req, res) =>{
    try{

        const id = req.params.id

        const user = await userModel.findByIdAndDelete(id)

        if(!user)
        return res.status(404).json({
            error: `user not found`
        })
        res.status(200).json({
            message: `You have successfully deleted this user`,
        })
        
    }
    catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}



